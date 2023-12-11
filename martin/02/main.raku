constant $input-file = 'input.txt';

my Int $nb-red-cubes   := 12;
my Int $nb-green-cubes := 13;
my Int $nb-blue-cubes  := 14;

grammar Game {
    token TOP { <game><setlist> }

    rule game { Game' '<num>\: }
    rule color { red | green | blue }
    rule cube { <num> <color> }
    rule set { <cube> * % [ \, ] }
    rule setlist { <set> * % [ \; ] }

    token num { \d+ }
}

class Actions {
  method TOP ($/) of Int {
    make $<setlist>.made ?? $<game>.made !! 0;
  }

  method game($/) of Int {
    make +$<num>;
  }

  method cube($/) returns Bool {
    make do given $<color> {
      when 'red'   { +$<num> <= $nb-red-cubes }
      when 'green' { +$<num> <= $nb-green-cubes }
      when 'blue'  { +$<num> <= $nb-blue-cubes }
    }
  }

  method set ($/) {
    make so [$<cube>.map(*.made)].all;
  }

  method setlist ($/) {
    make so [$<set>.map(*.made)].all;
  }
}

sub get-possible-game(Str $line) of Int {
  my $game := Game.parse($line, actions => Actions);
  $game.made;
}

multi game-id-reducer returns Int {
  [+] @_.map(&get-possible-game)
}
multi game-id-reducer(Int $acc, Str $line --> Int) {
  $acc + get-possible-game($line);
}

my @lines = $input-file.IO.lines;
say reduce &game-id-reducer, @lines;

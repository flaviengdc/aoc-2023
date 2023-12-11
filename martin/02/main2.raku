constant $input-file = 'input.txt';

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
    make $<setlist>.made;
  }

  method game($/) of Int {
    make +$<num>;
  }

  method cube($/) returns Pair {
    make (~$<color>) => (+$<num>);
  }

  method set ($/) {
    my %colors;

    for [$<cube>.map(*.made)] -> $color {
      %colors{$color.key} = $color.value;
    }

    make [%colors{'red'}, %colors{'green'}, %colors{'blue'}];
  }

  method setlist ($/) {
    my @result = [0, 0, 0];

    for [$<set>.map(*.made)] -> $rgb {
      for $rgb.kv -> $i, $value {
        @result[$i] = max $value, @result[$i];
      }
    }

    make [*] @result;
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

import 'dart:convert';
import 'dart:io';

void main() async {
  final input = await File('./input.txt').readAsString();
  final reduced = LineSplitter().convert(input).map((line) {
    final lineDigits =
        RegExp(r'(?=(one|two|three|four|five|six|seven|eight|nine|\d))')
            .allMatches(line)
            .map((match) => match.group(1))
            .map((n) {
      return n == null
          ? 0
          : int.tryParse(n) == null
              ? [
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "six",
                    "seven",
                    "eight",
                    "nine",
                  ].indexOf(n) +
                  1
              : int.parse(n);
    });

    return int.parse('${lineDigits.first}${lineDigits.last}');
  }).fold(0, (accumulator, currentValue) => accumulator + currentValue);

  print(reduced);
}

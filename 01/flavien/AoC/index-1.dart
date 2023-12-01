import 'dart:convert';
import 'dart:io';

void main() async {
  final input = await File('./input.txt').readAsString();
  final reduced = LineSplitter().convert(input).map((line) {
    final lineDigits =
        RegExp(r'\d').allMatches(line).map((match) => match.group(0));

    return int.parse('${lineDigits.first}${lineDigits.last}');
  }).fold(0, (accumulator, currentValue) => accumulator + currentValue);

  print(reduced);
}

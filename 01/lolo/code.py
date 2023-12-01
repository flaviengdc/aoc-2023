
import re

with open((__file__.rstrip("code.py")+"input.txt"), 'r') as input_file:
    input = input_file.read()

input_as_lines = input.splitlines()

# part 1


def part1():
    sum = 0
    for line in input_as_lines:
        first_digit = next((char for char in line if char.isdigit()), None)
        reversed_line = line[::-1]
        last_digit = next(
            (char for char in reversed_line if char.isdigit()), None)
        sum = sum + int(first_digit+last_digit)
    print(sum)


def part2():
    string_digits = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,

        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9
    }
    sum = 0
    for line in input_as_lines:
        digits = re.findall(
            "(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))", line)
        sum += string_digits[digits[0]]*10 + string_digits[digits[-1]]
    print(sum)


# part1()
part2()

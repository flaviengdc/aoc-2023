use crate::utils::read_input;
use std::collections::HashMap;

const INPUT: &str = include_str!("./input");

pub fn puzzle1() {
    let calibrations: i32 = read_input(INPUT)
        .map(|line| line.chars().filter(|char| char.is_numeric()).collect())
        .map(|numbers| get_line_number(numbers))
        .sum::<i32>();
    println!("{:?}", calibrations);
}

pub fn puzzle2() {
    let calibrations: i32 = read_input(INPUT)
        .map(|line| {
            parse_numbers(line)
                .chars()
                .filter(|char| char.is_numeric())
                .collect()
        })
        .map(|numbers| get_line_number(numbers))
        .sum::<i32>();

    println!("{:?}", calibrations);
}

fn get_line_number(line_numbers: Vec<char>) -> i32 {
    let first_number = line_numbers.get(0).expect("should have first number");
    let last_number = line_numbers
        .get(line_numbers.len() - 1)
        .expect("should have last member");

    let mut number_string = String::from(first_number.to_string());
    number_string.push_str(&last_number.to_string());

    number_string.parse::<i32>().expect("should be a string")
}

fn parse_numbers(line: &str) -> String {
    let string_to_number: HashMap<&str, &str> = HashMap::from([
        ("one", "o1e"),
        ("two", "t2o"),
        ("three", "t3e"),
        ("four", "f4r"),
        ("five", "f5e"),
        ("six", "s6x"),
        ("seven", "s7n"),
        ("eight", "e8t"),
        ("nine", "n9e"),
    ]);

    let mut parsed_string = String::from(line);

    for (key, value) in string_to_number {
        parsed_string = parsed_string.replace(key, value);
    }

    parsed_string
}

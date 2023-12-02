use regex::Regex;

use crate::utils::read_input;

const INPUT: &str = include_str!("./input");

const MAX_RED: i32 = 12;
const MAX_GREEN: i32 = 13;
const MAX_BLUE: i32 = 14;

pub fn puzzle1() {
    let re_id = Regex::new(r"Game (\d+)").unwrap();

    let result: i32 = read_input(INPUT)
        .filter(|line| {
            let re_blue = get_regex_for_color("blue");
            for result in re_blue.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > MAX_BLUE {
                        return false;
                    }
                }
            }
            let re_green = get_regex_for_color("green");
            for result in re_green.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > MAX_GREEN {
                        return false;
                    }
                }
            }
            let re_red = get_regex_for_color("red");
            for result in re_red.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > MAX_RED {
                        return false;
                    }
                }
            }

            true
        })
        .map(|line| {
            re_id.captures(line).expect("Should have game ID")[1]
                .parse::<i32>()
                .expect("Id should be int")
        })
        .sum::<i32>();

    println!("{:?}", result);
}

pub fn puzzle2() {
    let result: i32 = read_input(INPUT)
        .map(|line| {
            let mut max_blue = 0;
            let mut max_green = 0;
            let mut max_red = 0;
            let re_blue = get_regex_for_color("blue");
            for result in re_blue.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > max_blue {
                        max_blue = count;
                    }
                }
            }
            let re_green = get_regex_for_color("green");
            for result in re_green.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > max_green {
                        max_green = count;
                    }
                }
            }
            let re_red = get_regex_for_color("red");
            for result in re_red.captures_iter(line) {
                if result.get(1).is_some() {
                    let count = result[1].parse::<i32>().expect("Should be int");

                    if count > max_red {
                        max_red = count;
                    }
                }
            }

            max_red * max_green * max_blue
        })
        .sum::<i32>();

    println!("{:?}", result);
}

fn get_regex_for_color(color: &str) -> Regex {
    let pattern = format!(r"(\d+) {}", color);
    Regex::new(&pattern).unwrap()
}

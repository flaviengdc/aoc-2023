use regex::Regex;

use crate::utils::read_input;

const INPUT: &str = include_str!("./input");

pub fn puzzle1() {
    let re_number = Regex::new(r"(\d+)").unwrap();
    let plan: Vec<&str> = read_input(INPUT).collect();
    let mut numbers: Vec<i32> = vec![];

    for (line_y, line) in plan.iter().enumerate() {
        for number in re_number.captures_iter(line) {
            if number.get(1).is_none() {
                continue;
            }
            'number: for x in
                number.get(1).unwrap().start() as i32 - 1..=number.get(1).unwrap().end() as i32
            {
                for y in line_y as i32 - 1..=line_y as i32 + 1 {
                    if x < 0 || y < 0 || x >= line.len() as i32 || y >= plan.len() as i32 {
                        continue;
                    }

                    let char = plan
                        .get(y as usize)
                        .expect("line should exists")
                        .chars()
                        .nth(x as usize)
                        .expect("char should exists");

                    if char != '.' && !char.is_numeric() {
                        numbers.push(number[1].parse::<i32>().expect("should be int"));

                        break 'number;
                    }
                }
            }
        }
    }
    println!("{:?}", numbers.clone().into_iter().sum::<i32>());
}

pub fn puzzle2() {
    let re_number = Regex::new(r"(\d+)").unwrap();
    let re_gear = Regex::new(r"(\*)").unwrap();

    let plan: Vec<&str> = read_input(INPUT).collect();
    let mut gears: Vec<i32> = vec![];

    for (line_y, line) in plan.iter().enumerate() {
        for gear in re_gear.captures_iter(line) {
            if gear.get(1).is_none() {
                continue;
            }

            let gear_x = gear.get(1).unwrap().start();
            let mut adjacent_gears: Vec<i32> = vec![];

            for y in line_y as i32 - 1..=line_y as i32 + 1 {
                if y < 0 && y < plan.len() as i32 {
                    continue;
                }
                for number in re_number.captures_iter(plan.get(y as usize).unwrap()) {
                    if number.get(1).is_none() {
                        continue;
                    }

                    let start_number = number.get(1).unwrap().start() as i32;
                    let end_number = number.get(1).unwrap().end() as i32;

                    for x in start_number - 1..=end_number {
                        if x == gear_x as i32 {
                            adjacent_gears.push(number[1].parse::<i32>().unwrap());
                        }
                    }
                }
            }

            if adjacent_gears.len() == 2 {
                gears.push(adjacent_gears.get(0).unwrap() * adjacent_gears.get(1).unwrap());
            }
        }
    }

    println!("{:?}", gears.iter().sum::<i32>())
}

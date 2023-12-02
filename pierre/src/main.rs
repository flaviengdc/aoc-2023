use std::env;
mod day01;
mod day02;
mod utils;

fn main() {
    let args: Vec<String> = env::args().collect();

    let day = args
        .get(1)
        .expect("day required")
        .parse::<i32>()
        .expect("Expect day to be integer");

    match day {
        1 => {
            day01::puzzle1();
            day01::puzzle2();
        }
        2 => {
            day02::puzzle1();
            day02::puzzle2();
        }
        _ => {
            panic!("unkown day {}", day)
        }
    }
}

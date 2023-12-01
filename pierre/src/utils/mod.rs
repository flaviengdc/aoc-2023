pub fn read_input(file: &str) -> impl Iterator<Item = &str> {
    file.split("\n").filter(|line| line.len() > 0)
}

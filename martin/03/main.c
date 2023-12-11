#include <stdbool.h>
#include <stdio.h>
#include <string.h>

#include "utils.h"

#define FILENAME "input.txt"
#define LINE_LENGTH 150

bool is_symbol(char c) {
  if (is_endline(c)) {
    return false;
  }

  if (is_empty(c)) {
    return false;
  }

  if (is_digit(c)) {
    return false;
  }

  return true;
}

unsigned long int parse_two_lines(char line1[], char line2[],
                                  bool added_bitmask[]) {
  unsigned long int result = 0;

  int current_number = 0;
  bool symbol_flag = false;

  for (int i = 0; i < LINE_LENGTH; i++) {
    char c = line1[i];

    char d0 = line2[i ? i - 1 : i];
    char d1 = line2[i];

    if (is_symbol(d0) || is_symbol(d1) || is_symbol(c)) {
      symbol_flag = true;
    }

    if (is_digit(c)) {
      current_number *= 10;
      current_number += get_digit(c);
      continue;
    }

    // Not a digit:

    // Should we take the last number?
    if (current_number && symbol_flag) {
      // Only add the number once
      if (added_bitmask[i] == false) {
        result += current_number;
        added_bitmask[i] = true;
      }
    }

    // Reset current number
    current_number = 0;

    if (!is_symbol(c)) {
      symbol_flag = false;
    }

    if (is_endline(c)) {
      break;
    }
  }

  return result;
}

int sum_part_numbers() {
  unsigned long int result = 0;

  FILE *fp = fopen(FILENAME, "r");

  char line1[LINE_LENGTH];
  char line2[LINE_LENGTH];

  bool added_bitmask[LINE_LENGTH];

  fgets(line1, LINE_LENGTH, fp);

  while (fgets(line2, LINE_LENGTH, fp)) {
    result += parse_two_lines(line1, line2, added_bitmask);
    memset(added_bitmask, false, sizeof(added_bitmask));

    result += parse_two_lines(line2, line1, added_bitmask);
    strcpy(line1, line2);
  }

  fclose(fp);

  return result;
}

int main() {
  int result = sum_part_numbers();
  printf("%d\n", result);
  return 0;
}

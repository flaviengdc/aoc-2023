#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "utils.h"

#define FILENAME "input.txt"
#define LINE_LENGTH 150
#define MAX_NB_PART_NUMBERS 6

struct Gear {
  int length;
  int numbers[MAX_NB_PART_NUMBERS];
};

struct Gear *alloc_empty_gearp() {
  struct Gear *gearp = malloc(sizeof(struct Gear));
  gearp->length = 0;
  for (size_t i = 0; i < MAX_NB_PART_NUMBERS; i++) {
    gearp->numbers[i] = 0;
  }
  return gearp;
}

struct Gear *add_part_number_to_gear(struct Gear *gearp, int number) {
  if (!gearp) {
    gearp = alloc_empty_gearp();
  }

  gearp->numbers[gearp->length] = number;
  gearp->length += 1;

  return gearp;
}

void parse_line(char c, char d, int i, struct Gear *gears[],
                int *current_number, int *current_gear_i, int first_pass) {
  if (is_gear(c)) {
    *current_gear_i = i;
  }

  if (is_digit(d)) {
    *current_number *= 10;
    *current_number += get_digit(d);
  } else {
    if (*current_number && *current_gear_i + 1 && first_pass) {
      gears[*current_gear_i] =
          add_part_number_to_gear(gears[*current_gear_i], *current_number);
    }

    if (!is_gear(c)) {
      *current_gear_i = -1;
    }

    *current_number = 0;
  }
}

void parse_two_lines(char line_a[], char line_b[], struct Gear *gears[],
                     int first_pass_a) {
  unsigned long int result = 0;

  int current_number_a = 0;
  int current_number_b = 0;

  int current_gear_i_a = -1;
  int current_gear_i_b = -1;

  for (int i = 0; i < LINE_LENGTH; i++) {
    char c = line_a[i];
    char d = line_b[i];

    parse_line(c, c, i, gears, &current_number_a, &current_gear_i_a,
               first_pass_a);
    parse_line(c, d, i, gears, &current_number_b, &current_gear_i_b, 1);

    if (is_endline(c)) {
      break;
    }
  }

  return;
}

unsigned long int extract_gear_ratios(struct Gear *gears[]) {
  unsigned long int result = 0;

  for (int i = 0; i < LINE_LENGTH; i++) {
    struct Gear *gearp = gears[i];

    if (gearp) {
      if (gearp->length == 2) {
        unsigned long int ratio = gearp->numbers[0] * gearp->numbers[1];
        result += ratio;
      }

      free(gearp);
    }
  }

  return result;
}

int sum_gear_ratios() {
  unsigned long int result = 0;

  FILE *fp = fopen(FILENAME, "r");

  char line1[LINE_LENGTH];
  char line2[LINE_LENGTH];

  struct Gear *gears1[LINE_LENGTH];
  struct Gear *gears2[LINE_LENGTH];

  memset(gears1, 0, sizeof(gears1));
  memset(gears2, 0, sizeof(gears2));

  fgets(line1, LINE_LENGTH, fp);

  while (fgets(line2, LINE_LENGTH, fp)) {
    parse_two_lines(line1, line2, gears1, 0);
    parse_two_lines(line2, line1, gears2, 1);

    result += extract_gear_ratios(gears1);

    // line1 <- line2
    strcpy(line1, line2);

    // gears1 <- gears2
    memcpy(gears1, gears2, sizeof(gears1));
    memset(gears2, 0, sizeof(gears2));
  }

  fclose(fp);

  return result;
}

int main() {
  int result = sum_gear_ratios();
  printf("%d\n", result);
  return 0;
}

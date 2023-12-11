#include "utils.h"

#define EMPTY '.'
#define GEAR '*'

bool is_digit(char c) { return 0x30 <= c && c <= 0x39; }

int get_digit(char c) { return c - 0x30; }

bool is_endline(char c) {
  if (c == 0x0 || c == 0xa) {
    return true;
  }
  return false;
}

bool is_empty(char c) {
  if (c == EMPTY) {
    return true;
  }

  return false;
}

bool is_gear(char c) {
  if (c == GEAR) {
    return true;
  }

  return false;
}

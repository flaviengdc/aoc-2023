	.intel_syntax noprefix
	.text
	.section	.rodata
.MODE:
	.string	"r"
.PATHNAME:
	.string	"input.txt"
.D_FORMAT:
	.string	"%d\n"

.one:
  .string "one"
.two:
  .string "two"
.three:
  .string "three"
.four:
  .string "four"
.five:
  .string "five"
.six:
  .string "six"
.seven:
  .string "seven"
.eight:
  .string "eight"
.nine:
  .string "nine"

	.text

  .globl get_number
  .type get_number, @function
get_number:
  push	rbp
  mov	rbp, rsp

  push 0 # 10
  push 0 # 1
  mov rbx, rbp # 10 flag

  mov r13, rdi
  .get_number_loop:
  mov r12b, BYTE PTR [r13]

  # null byte
  test r12b, r12b
  jz .result

  # Test '1', '2', ...

  # 0x30 <= r12 <= 0x39
  cmp r12b, 0x30
  jl .ascii
  cmp r12b, 0x39
  jg .ascii
  # Push ASCII byte to digit:
  mov r15b, r12b
  sub r15b, 0x30

  # Maybe for 10th:
  mov BYTE PTR [rbx - 8], r15b
  sub rbx, 8
  # Always for 1st:
  mov BYTE PTR [rbp - 16], r15b

  jmp .endloop


  .ascii: # Test 'one', 'two'...

  # Save register values on the stack:
  push r13
  push r15

  # Initialize word list
  mov r14, OFFSET FLAT:.nine
  push r14
  mov r14, OFFSET FLAT:.eight
  push r14
  mov r14, OFFSET FLAT:.seven
  push r14
  mov r14, OFFSET FLAT:.six
  push r14
  mov r14, OFFSET FLAT:.five
  push r14
  mov r14, OFFSET FLAT:.four
  push r14
  mov r14, OFFSET FLAT:.three
  push r14
  mov r14, OFFSET FLAT:.two
  push r14
  mov r14, OFFSET FLAT:.one
  push r14

  mov r15, 0 # word list iterator
  .next_word:
  mov r14, 0 # word character iterator

  .ascii_loop:
  cmp r15, 9 # This is the word list length
  jge .ascii_clean_loop

  mov r12b, BYTE PTR [r13+r14] # current character for the current line

  mov r10, QWORD PTR [rsp + r15*8] # current word address
  mov r11b, BYTE PTR [r10 + r14] # current word character

  # null byte
  test r11b, r11b
  jz .ascii_success

  cmp r11b, r12b
  je .ascii_next_char
  jne .ascii_next_word

  .ascii_success:
  # Push number value
  inc r15b # index + 1

  # Maybe for 10th:
  mov BYTE PTR [rbx - 8], r15b
  mov rbx, rbp
  sub rbx, 8
  # Always for 1st:
  mov BYTE PTR [rbp - 16], r15b

  jmp .endloop

  .ascii_next_char:
  inc r14
  jmp .ascii_loop

  .ascii_next_word:
  inc r15
  jmp .next_word

  .ascii_clean_loop:
  # Discard word list from the stack:
  pop r15
  pop r15
  pop r15
  pop r15
  pop r15
  pop r15
  pop r15
  pop r15
  pop r15

  # Restore register values from the stack:
  pop r15
  pop r13

  # Jump to .endloop

  .endloop:
  inc r13
  jmp .get_number_loop

  .result:
  mov r12, QWORD PTR [rbp - 16] # 1
  mov r13, QWORD PTR [rbp - 8] # 10

  imul r13, 10
  add r13, r12

  mov rax, r13

  leave
  ret


	.globl main
	.type	main, @function
main:
  push	rbp
  mov	rbp, rsp

  sub rsp, 24

  # Open file:
  mov rdi, OFFSET FLAT:.PATHNAME
  mov rsi, OFFSET FLAT:.MODE
  call fopen
  
  mov QWORD PTR [rbp-8], rax # file pointer
  mov QWORD PTR [rbp-16], 0 # result accumulator

  .loop:
  # Allocate 100 bytes ASCII buffer
  mov rdi, 100
  call malloc
  mov QWORD PTR [rbp-24], rax

  # Read line:
  mov	rdi, rax
  mov rsi, 100
  mov rdx, QWORD PTR [rbp-8]
  call fgets

  # Close & print results if EOF:
  test rax, rax
  jz .print_result

  # Recover the "calibration value" :)
  mov rdi, QWORD PTR [rbp-24]
  call get_number

  # Add to accumulator
  mov r12, QWORD PTR [rbp-16]
  add r12, rax
  mov QWORD PTR [rbp-16], r12

  # Free ASCII buffer
  mov rdi, QWORD PTR [rbp-24]
  call free

  jmp .loop

  .print_result:
  # Close file handle
  mov rdi, QWORD PTR [rbp-8]
  call	fclose

  # Print the result
  mov	rdi, OFFSET FLAT:.D_FORMAT
  mov rsi, QWORD PTR [rbp-16]
  call printf

  .success:
  mov eax, 0
  jmp .return
  .failure:
  mov eax, 1
  jmp .return
  .return:
  leave
  ret


.section	.note.GNU-stack,"",@progbits

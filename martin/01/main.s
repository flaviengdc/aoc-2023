	.intel_syntax noprefix
	.text
	.section	.rodata
.MODE:
	.string	"r"
.PATHNAME:
	.string	"input.txt"
.D_FORMAT:
	.string	"%d\n"

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
  mov r12, 0
  mov r12b, BYTE PTR [r13]

  # null byte
  test r12b, r12b
  jz .result

  # 0x30 <= r12 <= 0x39
  cmp r12b, 0x30
  jl .endloop
  cmp r12b, 0x39
  jg .endloop

  # Push ASCII byte to digit:
  mov r15b, r12b
  sub r15b, 0x30

  # Maybe for 10th:
  mov BYTE PTR [rbx - 8], r15b
  sub rbx, 8
  # Always for 1st:
  mov BYTE PTR [rbp - 16], r15b

  .endloop:
  inc r13
  jmp .get_number_loop

  .result:
  pop r12 # 1
  pop r13 # 10

  imul r13, 10
  add r13, r12

  mov rax, r13

  leave
  ret


	.globl	main
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

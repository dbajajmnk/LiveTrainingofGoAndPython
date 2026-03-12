package main

import "fmt"

func main() {
	numbers := make([]int, 3, 5)
	numbers[0] = 10
	numbers[1] = 20
	numbers[2] = 30

	numbers = append(numbers, 40)
	numbers = append(numbers, 50, 60)

	backup := make([]int, len(numbers))
	copy(backup, numbers)

	fmt.Printf("Slice: %v | Len: %d | Cap: %d\n", numbers, len(numbers), cap(numbers))
	fmt.Println("Backup:", backup)
}

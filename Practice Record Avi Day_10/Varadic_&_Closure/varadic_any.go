package main

import "fmt"

func sum(nums ...any) any {
	// total := 0
	// for _, num := range nums {
	// 	total += num
	// }
	return nums
}

func main() {
	fmt.Println(sum(1, "2", true))
	fmt.Println(sum(1, 2.35, "3", false, true, 6, 7, 8, 9, 10))
}

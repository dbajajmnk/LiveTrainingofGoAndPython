package main

import "fmt"

func main() {
	var a, b, c, e, f int = 10, 20, 30, 40, 50
	fmt.Print(a, b, c, e, f)
	students := make(map[string]int)
	students["1"] = 1
	fmt.Print(students)

	twoDimensionsArray := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}

	fmt.Print(twoDimensionsArray)

}

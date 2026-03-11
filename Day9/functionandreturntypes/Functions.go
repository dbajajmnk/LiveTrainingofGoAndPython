package main

import "fmt"

func main() {
	// sum, multi := addAndMultiple(10, 20)
	// fmt.Print(sum)
	// fmt.Print(multi)
	// sum := demoOfVarArguments(1, 2)
	// fmt.Println(sum)
	sum := demoOfVarArguments(1, 2, 3, 4, 5, 6, 7, 8, 9)
	fmt.Println(sum)

	sum = demoOfVarArguments("1", true, 10.5, "a", 6, 7, 8, 9)
	fmt.Println(sum)
	result := closurDemo()
	fmt.Println(result())

	// sum = demoOfVarArguments(1, 2, 9, 10, 11, 12, 144)
	// fmt.Println(sum)
	// demoOfVarArguments(1, 2, 45, 56, 66, 6, 6)
	// fmt.Println(sum)

}

func addAndMultiple(num1, num2 int) (int, int) {
	sum := num1 + num2
	multi := num1 * num2
	return sum, multi
}

//Verdetic
// func demoOfVarArguments(a ...int) int {
// 	sum := 0
// 	length := len(a)
// 	for i := 0; i < length; i++ {

// 		sum += a[i]
// 	}

// 	return sum

// }

func demoOfVarArguments(a ...any) any {

	return a

}

//Closure : We use annonmys function to create closure in go lang
func closurDemo() func() int {

	return func() int {
		return 10
	}

}

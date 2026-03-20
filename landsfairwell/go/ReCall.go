package main

import (
	"fmt"
)

func main() {

	fmt.Println("Hello World")
}

func findGreaterNumber(a, b int) int {
	if a > b {
		return a
	} else {
		return b
	}
}

func getMonthNameByNumber(a int) string {
	switch a {
	case 1:
		return "January"
	case 2:
		return "Feb"
	case 3:
		return "March"
	case 4:
		return "April"
	case 5:
		return "May"
	case 6:
		return "June"
	case 7:
		return "July"
	case 8:
		return "August"
	default:
		return "Sorry! invalid number"
	}
}

func LoopIngTest() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}

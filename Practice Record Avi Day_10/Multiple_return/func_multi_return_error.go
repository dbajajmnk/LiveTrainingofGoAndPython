package main

import "fmt"

func divide(a int, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("Error of zero value for divisor")
	} else {
		return a / b, nil
	}
}

func main() {
	var a int
	var b int
	fmt.Print("Enter any two numbers: ")
	fmt.Scan(&a, &b)
	result, err := divide(a, b)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("Final result is -> %d", result)
	}
}

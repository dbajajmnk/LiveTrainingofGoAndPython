package main

import "fmt"

func main() {
	var choice int
	var a, b float64

	fmt.Println("1. Add\n2. Sub\n3. Multi\n4. Div")
	fmt.Print("Choose operation: ")
	fmt.Scan(&choice)

	fmt.Print("Enter two numbers: ")
	fmt.Scan(&a, &b)

	if choice == 1 {
		fmt.Printf("Result: %.2f\n", addi(a, b))
	} else if choice == 2 {
		fmt.Printf("Result: %.2f\n", sub(a, b))
	} else if choice == 3 {
		fmt.Printf("Result: %.2f\n", multi(a, b))
	} else if choice == 4 {
		if b == 0 {
			fmt.Println("Error: Division by zero")
		} else {
			fmt.Printf("Result: %.2f\n", div(a, b))
		}
	} else {
		fmt.Println("Invalid choice")
	}
}

func addi(a, b float64) float64  { return a + b }
func sub(a, b float64) float64   { return a - b }
func multi(a, b float64) float64 { return a * b }
func div(a, b float64) float64   { return a / b }

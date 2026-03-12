package main

import "fmt"

func main() {
	var marks int
	fmt.Print("Enter your marks (0-100): ")
	fmt.Scan(&marks)

	switch {
	case marks >= 90 && marks <= 100:
		fmt.Println("Grade: A")
	case marks >= 80:
		fmt.Println("Grade: B")
	case marks >= 70:
		fmt.Println("Grade: C")
	case marks >= 60:
		fmt.Println("Grade: D")
	case marks >= 0 && marks < 60:
		fmt.Println("Grade: F")
	default:
		fmt.Println("Invalid input! Please enter marks between 0 and 100.")
	}
}

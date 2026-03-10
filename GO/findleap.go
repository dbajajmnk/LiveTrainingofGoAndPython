package main
import "fmt"

func main() {
	year := 2025

	if year%400 == 0 || (year%4 == 0 && year%100 != 0) {
		fmt.Println("Leap Year")
	} else {
		fmt.Println("Not Leap Year")
	}
}
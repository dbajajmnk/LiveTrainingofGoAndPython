package main

import "fmt"

func greet(name string, a int, b int) {
	fmt.Println("Hello Mr: ", name)
	result := sum(a, b)
	fmt.Println("The sum value is ", result)
}

func sum(a int, b int) int {
	sum := a + b
	fmt.Println("calculating sum")
	return sum
}

func main() {

	// fmt.Println("Hello Go")
	// var name string = "Avichal"
	// var age int = 23
	var a, b int
	// var age int
	name := "Avichal"
	// greet(name)
	fmt.Println("Enter any two numbers : ")
	fmt.Scanln(&a, &b)
	fmt.Printf("Greeting Mr %s and calculating sum of %d and %d \n", name, a, b)
	greet(name, a, b)

}

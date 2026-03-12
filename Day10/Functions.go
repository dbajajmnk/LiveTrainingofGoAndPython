package main

import "fmt"

//Multiple Return Function
func calc(a, b int) (sum, diff, prod int) {
	sum = a + b
	diff = a - b
	prod = a * b
	return
}

//Variadic Function
func add(num ...int) int {
	sum := 0
	for i := 0; i < len(num); i++ {
		sum += num[i]
	}
	return sum
}

//Closure Function
func intSeq(i int) func() int {
	return func() int {
		i++
		return i
	}
}

func main() {
	fmt.Println("Welcome :)")
	s, d, p := calc(10, 5)
	fmt.Println(s, d, p)

	fmt.Println(add(1, 2, 3, 3, 4, 4, 44))
	newInts := intSeq(4)
	fmt.Println(newInts())
	fmt.Println(newInts())
}

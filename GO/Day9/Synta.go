
package main

import "fmt"

func main() {
	// var a, b, c, d int = 1, 3, 5, 7

	// fmt.Println(a)
	// fmt.Println(b)
	// fmt.Println(c)
	// fmt.Println(d)

	// myValue := 10

	// for i := 0; i < 10; i++ {
	// 	myValue = myValue
	// 	if i > 0 {
	// 		myValue = myValue - 1
	// 	}
	// 	fmt.Println(myValue)

	var arr = [3]int{3, 2, 4}
	var arr1 = [...]int{2, 3, 4, 5, 6}
	arr2 := [...]int{2, 1, 3, 6, 66, 6}

	arr3 := [3]int{1: 10, 2: 40}
	mySlice := []int{1, 2, 3}
	convSlice := arr[1:3]

	fmt.Println(arr)
	fmt.Println(arr1)
	fmt.Println(arr2)
	fmt.Println(arr3)
	fmt.Println(mySlice)
	fmt.Println(convSlice)

	for i := range 10 {
		fmt.Println(10 - i)
	}

	n1, n2 := 0, 1
	fmt.Print("Fibonacci Series: ")

	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", n1)
		temp := n1
		n1 = n2
		n2 = temp + n2
	}
}
=======
package main

import "fmt"

func main() {
	// var a, b, c, d int = 1, 3, 5, 7

	// fmt.Println(a)
	// fmt.Println(b)
	// fmt.Println(c)
	// fmt.Println(d)

	// myValue := 10

	// for i := 0; i < 10; i++ {
	// 	myValue = myValue
	// 	if i > 0 {
	// 		myValue = myValue - 1
	// 	}
	// 	fmt.Println(myValue)

	var arr = [3]int{3, 2, 4}
	var arr1 = [...]int{2, 3, 4, 5, 6}
	arr2 := [...]int{2, 1, 3, 6, 66, 6}

	arr3 := [3]int{1: 10, 2: 40}
	mySlice := []int{1, 2, 3}
	convSlice := arr[1:3]

	fmt.Println(arr)
	fmt.Println(arr1)
	fmt.Println(arr2)
	fmt.Println(arr3)
	fmt.Println(mySlice)
	fmt.Println(convSlice)

	for i := range 10 {
		fmt.Println(10 - i)
	}

	n1, n2 := 0, 1
	fmt.Print("Fibonacci Series: ")

	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", n1)
		temp := n1
		n1 = n2
		n2 = temp + n2
	}
}


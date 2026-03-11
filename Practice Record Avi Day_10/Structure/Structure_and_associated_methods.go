package main

import "fmt"

type Rectangle struct {
	l int
	h int
}

func (r Rectangle) area() int {
	return r.l * r.h
}

func main() {
	var rect Rectangle
	// rect := Rectangle{
	// 	l: 2,
	// 	h: 3,
	// }
	fmt.Println("Enter the height of rectangle: ")
	fmt.Scan(&rect.h)
	fmt.Println("Enter the length of rectangle: ")
	fmt.Scan(&rect.l)
	fmt.Println("The height of rectangle: ")
	fmt.Println(rect.h)
	fmt.Println("The length of rectangle: ")
	fmt.Println(rect.l)
	fmt.Printf("value of length is %d and height is %d", rect.l, rect.h)
	fmt.Println()
	// result:=rect.area()
	fmt.Printf("Value of Area of the rectangle: ")
	fmt.Println(rect.area())
}

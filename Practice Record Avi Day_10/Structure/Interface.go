// package main

// import "fmt"

// type Circle struct {
// 	r int
// }

// type Rectangle struct {
// 	l int
// 	h int
// }
// type Shape interface {
// 	area() int
// }

// func (r Rectangle) area() int {
// 	return r.l * r.h
// }

// func (c Circle) area() int {
// 	return 3 * c.r * c.r
// }

// func main() {
// 	var rect Rectangle
// 	var circ Circle
// 	fmt.Println("Make a choice using 1 or 2: ")
// 	var choice int
// 	fmt.Scan(&choice)
// 	if choice > 0 && choice < 3 {
// 		if choice == 1 {
// 			fmt.Println("Enter the radius value: ")
// 			fmt.Scan(&circ.r)
// 			fmt.Println(circ.area())
// 		} else {
// 			fmt.Println("Enter the height of rectangle: ")
// 			fmt.Scan(&rect.h)
// 			fmt.Println("Enter the length of rectangle: ")
// 			fmt.Scan(&rect.l)
// 			fmt.Println(rect.area())
// 		}
// 	} else {
// 		fmt.Println("Invalid Input")
// 	}
// }

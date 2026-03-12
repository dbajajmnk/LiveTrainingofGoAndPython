// package main

// import "fmt"

// func main() {
// 	var arr [6]int
// 	for i := 0; i < len(arr); i++ {
// 		fmt.Printf("Enter the value at index %d: ", i)
// 		fmt.Scan(&arr[i])
// 	}
// 	fmt.Println(arr)
// 	slice := arr[1:5]
// 	fmt.Println("Sliced list from array is: ")
// 	fmt.Println(slice)

// 	slice = append(slice, 30)

// 	fmt.Println(slice)

// 	slice2 := []int{20, 30, 40, 50}
// 	slice3 := make([]int, len(slice2))

// 	fmt.Println("Printing slice 2")
// 	fmt.Println(slice2)

// 	fmt.Println("Printing slice 3")

// 	copy(slice3, slice2)
// 	fmt.Println("Appending a new element to slice 3 after copying from slice 2: ")
// 	slice3 = append(slice3, 66)

// 	fmt.Println(slice3)

// }

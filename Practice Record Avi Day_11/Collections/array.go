// package main

// import "fmt"

// func main() {
// 	// Declaring a fixed-size array
// 	array := [3]int{1, 2, 3}

// 	// You cannot do this:
// 	// array = append(array, 4) // This will cause a compilation error

// 	// Instead, create a slice from the array (using the full slice expression `[:]`)
// 	slice := array[:]
// 	fmt.Printf("Slice before append: %v, Length: %d, Capacity: %d\n", slice, len(slice), cap(slice))

// 	// Use append on the slice and reassign the result
// 	slice = append(slice, 4, 5)
// 	fmt.Printf("Slice after append: %v, Length: %d, Capacity: %d\n", slice, len(slice), cap(slice))
// }

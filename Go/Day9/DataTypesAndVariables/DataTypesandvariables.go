package main

import "fmt"

/*
Zero Type values -Done
Compiler check unused variables -Done
variable with var keyword Done
Variable with type inherance Done
Other Data types
Number
	Float
	Int

.
Data Types available in Go
Primitive Types
Composite (Collection)
Reference


*/

func main() {

	// //Zero Value
	// var age int
	// fmt.Println(age)
	// var isTrue bool
	// fmt.Println(isTrue)
	// var name string
	// fmt.Println(name)
	// var price float32
	// fmt.Println(price)
	/////////////////////////////////////// Declaration and Initilaztion ///////////////////////////////////////////
	// var age int = 10
	// fmt.Println(age)
	// var isTrue bool = true
	// fmt.Println(isTrue)
	// var name string = "Anuj"
	// fmt.Println(name)
	// var price float32 = 10.5
	// fmt.Println(price)
	/////////////////////////////////////// Inference ///////////////////////////////////////////
	age := 10
	fmt.Println(age)
	isTrue := true
	fmt.Println(isTrue)
	name := "Anuj"
	fmt.Println(name)
	price := 10.5
	fmt.Println(price)

	// var myValue int = 10

	// for i := 1; i < 10; i++ {

	// 	if myValue > 0 {
	// 		myValue -= i
	// 		fmt.Println(myValue)
	// 	}

	// }
	// fmt.Println("My Value ", myValue)
	//===============================================Composite==========================================//
	// var number [2]int = [2]int{1, 2}
	// fmt.Println(number)
	// var sliceDemo []string = []string{"1", "2", "3", "4", "5"}
	// sliceDemo = append(sliceDemo, "10")
	// fmt.Printf("Slice Demo", sliceDemo)

	// //Map
	// var studentsRecords map[string]int = map[string]int{"N": 1}
	// studentsRecords["P"] = 2
	// fmt.Println(studentsRecords)

	number := [2]int{1, 2}
	fmt.Println(number)
	sliceDemo := []string{"1", "2", "3", "4", "5"}
	sliceDemo = append(sliceDemo, "10")
	fmt.Printf("Slice Demo", sliceDemo)

	//Map
	studentsRecords := map[string]int{"N": 1}
	studentsRecords["P"] = 2
	fmt.Println(studentsRecords)

}

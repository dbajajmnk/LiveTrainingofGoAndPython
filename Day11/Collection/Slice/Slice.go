package main

import "fmt"

type Person struct {
	name    string
	age     int
	hobbies []string
}
type Info interface {
	printInfo()
}

func main() {
	anuj := Person{"Deepak", 29, []string{"Cricket", "Learning Lanuages", "Charom"}}
	fmt.Print(anuj)
	fmt.Println(anuj.hobbies)
	fmt.Println(anuj.hobbies[1])

	// //var myArray [4]int = [4]int{1, 2, 3, 4}
	// myArray := [...]int{1, 2, 3, 4, 5, 8, 9}
	var myArray []int = []int{50, 50, 34, 4, 56}
	//myArray := make([]int, 0, 10)
	myArray = append(myArray, 60, 59, 34)
	// myArray[0] = 1
	// myArray[1] = 2
	// myArray[2] = 3

	fmt.Println(myArray)

}

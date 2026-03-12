package main

import "fmt"

type Person struct {
	name    string
	age     int
	hobbies [3]string
}
type Info interface {
	printInfo()
}

func main() {
	anuj := Person{"Deepak", 29, [3]string{"Cricket", "Learning Lanuages", "Charom"}}
	fmt.Print(anuj)
	fmt.Println(anuj.hobbies)
	fmt.Println(anuj.hobbies[1])

	// //var myArray [4]int = [4]int{1, 2, 3, 4}
	// myArray := [...]int{1, 2, 3, 4, 5, 8, 9}
	var myArray [4]int = [4]int{}
	myArray[2] = 10
	myArray[3] = 6
	myArray[1] = 40
	myArray[0] = 20
	fmt.Println(myArray)

}

package main

import "fmt"

type Person struct {
	name    string
	age     int
	hobbies map[string]string
}
type Info interface {
	printInfo()
}

func main() {
	anuj := Person{"Deepak", 29, map[string]string{"Cricket": "1", "2": "Learning Lanuages", "3": "Charom"}}
	fmt.Print(anuj)
	fmt.Println(anuj.hobbies)

	// //var myArray [4]int = [4]int{1, 2, 3, 4}
	// myArray := [...]int{1, 2, 3, 4, 5, 8, 9}
	var myMap map[string]int = map[string]int{"One": 1}
	myMap["Go"] = 2
	myMap["Two"] = 3
	fmt.Println(myMap["Go"])
	fmt.Println(myMap)

}

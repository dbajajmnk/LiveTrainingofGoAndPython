package main

import "fmt"

func main() {

	var age int
	fmt.Println("Enter your age: ")
	fmt.Scan(&age)
	if age >= 18 {
		fmt.Println("Eligible for Job")
	} else {
		fmt.Println("Not eligible for voting")
	}
	for age_iter := age; age_iter >= 0; age_iter-- {
		fmt.Println(age_iter)
	}
	for age > 0 {
		fmt.Println(age)
		age--
	}

}

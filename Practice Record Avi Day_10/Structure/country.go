package main

import "fmt"

// type Country struct {
// 	name     string
// 	la string
// }

type candidate struct {
	name  string
	votes int
}

func main() {
	var cont int
	var role int
	var key int
	var cdt candidate
	fmt.Println("choose your country number from the list: ")
	fmt.Println("India->1")
	fmt.Println("China->2")
	fmt.Println("USA->3")
	fmt.Println("Russia->4")
	fmt.Println("North Korea -> 5")
	fmt.Scan(&cont)
	countries := []string{"India->1", "China->2", "USA->3", "Russia->4", "North Korea -> 5"}
	countries_map := map[int]string{
		1: "India",
		2: "China",
		3: "USA",
		4: "Russia",
		5: "North Korea",
	}
	// fmt.Println(len(countries))

	if cont <= len(countries) && cont > 0 {
		fmt.Printf("You have choosen %s country to vote for", countries_map[cont])
		fmt.Println("Are you a candidate or voter choose 1 or 2 respectivelly: ")
		fmt.Scan(&role)
		if role > 0 && role < 3 {
			if role == 1 {
				fmt.Println("Enter your name: ")
				fmt.Scan(&cdt.name)
				fmt.Println("you are registered")
			} else {
				fmt.Println("Choose any number from the list of countries to vote for: ")
				fmt.Println(countries_map)
				fmt.Scan(&key)

			}
		} else {
			fmt.Println("Invalid choice")
		}

	} else {
		fmt.Println("Choose a valid country!!!!")
	}

}

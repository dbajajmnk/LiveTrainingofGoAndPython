// package main

// import "fmt"

// func main() {
// 	my_map := make(map[string]int)
// 	my_map["hello"] = 1
// 	my_map["satoruGojo"] = -1
// 	my_map["Geto"] = 2
// 	my_map["Yuji"] = 5

// 	fmt.Println(my_map)
// 	var target string
// 	fmt.Println("Enter the targets name: ")
// 	fmt.Scan(&target)

// 	value, exists := my_map[target]
// 	if exists {
// 		fmt.Println(value, " Incarnations ")
// 	} else {
// 		fmt.Println("Not found but has he incernated? Yes or No")
// 		var incarnated string
// 		fmt.Scan(&incarnated)
// 		if incarnated == "No" || incarnated == "no" {
// 			fmt.Println("Sorry for him ")
// 		} else {
// 			if incarnated == "Yes" || incarnated == "yes" {
// 				my_map[target] = 1
// 				fmt.Println("Map updated ")
// 				fmt.Println(my_map)
// 			} else {
// 				fmt.Println("Invalid cursed technique ")
// 			}
// 		}
// 	}
// }

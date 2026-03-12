package main

import "fmt"

func main() {
	// my_map := make(map[string]int)
	// my_map["Avichal"] = 23
	// my_map["Anuj"] = 22
	// fmt.Println(my_map)

	// slice := []int{}
	// slice=append(slice,20)
	// slice := make([]int, 2, 3)
	// slice = append(slice, 3, 4, 5, 6, 7, 8, 9)
	// fmt.Println(cap(slice), len(slice))

	// my_chan := make(chan string)
	// my_chan <- "Avi"
	// my_chan <- "Kusuma"
	// fmt.Println(<-my_chan)

	// var my_map map[string]int
	// // my_map["Arjun"] = 100
	// fmt.Println(my_map)

	// my_map1 := make(map[string]int)
	// my_map1["Avichal"] = 23
	// // my_map1["Anuj"] = 22
	// fmt.Println(&my_map1)

	arr := [3]int{1, 2, 3}

	slice := arr[:]
	fmt.Println(min(arr))
	fmt.Println(max(arr))

	fmt.Println(min(1, 2, 3, 4, 5))
	fmt.Println(max(1, 2, 3, 4, 5))

	fmt.Println(min("1", "2", "3"))
	fmt.Println(max("1", "2", "3"))

	fmt.Println(min("Avichal", "Anuj", "Deepak"))
	fmt.Println(max("Avichal", "Anuj", "Deepak"))

}

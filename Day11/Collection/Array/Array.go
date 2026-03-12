package main

import (
	"fmt"
	"slices"
)

type NumberList struct {
	Items [5]int
	Count int
}

func main() {
	list := NumberList{
		Items: [5]int{50, 10, 40, 20, 30},
	}

	fmt.Println("Original:", list.Items)

	slices.Sort(list.Items[:])
	fmt.Println("Sorted:  ", list.Items)

	var filtered NumberList
	for _, v := range list.Items {
		if v > 25 {
			filtered.Items[filtered.Count] = v
			filtered.Count++
		}
	}

	fmt.Println("Filtered :", filtered.Items)

	fmt.Print("Matching values only: ")
	for i := 0; i < filtered.Count; i++ {
		fmt.Printf("%d ", filtered.Items[i])
	}
	fmt.Println()
}

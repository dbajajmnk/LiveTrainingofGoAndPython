package main

import "fmt"

type Person struct {
	Name    string
	Ratings map[string]int
}

func main() {
	p := Person{
		Name:    "Joe",
		Ratings: make(map[string]int),
	}

	p.Ratings["Coding"] = 10
	p.Ratings["Reading"] = 8
	p.Ratings["Coding"] = 11

	val, exists := p.Ratings["Coding"]
	if exists {
		fmt.Printf("Joe's Coding level: %d\n", val)
	}

	delete(p.Ratings, "Reading")

	fmt.Println("Final Map:", p.Ratings)
}

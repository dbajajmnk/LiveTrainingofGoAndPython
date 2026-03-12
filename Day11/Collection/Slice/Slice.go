package main

import "fmt"

type Person struct {
	Name    string
	Hobbies []string
}

func main() {
	p := Person{
		Name:    "Harry",
		Hobbies: []string{"Reading", "Playing"},
	}

	p.Hobbies = append(p.Hobbies, "Coding")

	fmt.Println("Name:", p.Name)
	fmt.Println("Hobbies:", p.Hobbies)
	fmt.Println("Count:", len(p.Hobbies))

	fmt.Printf("%s loves: ", p.Name)
	for _, hobby := range p.Hobbies {
		fmt.Printf("%s ", hobby)
	}
	fmt.Println()
}

package main

import "fmt"

type Machine interface {
	Process()
}

type Voter struct {
	Country  string
	Language string
	Choice   string
}

func (v Voter) Process() {
	fmt.Printf("\n--- Vote Cast ---\n")
	fmt.Printf("Country: %s\nLanguage: %s\nVote for: %s\n", v.Country, v.Language, v.Choice)
}

func main() {
	var v Voter

	fmt.Print("Enter your country: ")
	fmt.Scanln(&v.Country)

	fmt.Print("Enter your language: ")
	fmt.Scanln(&v.Language)

	fmt.Print("Who are you voting for? ")
	fmt.Scanln(&v.Choice)

	var m Machine = v
	m.Process()
}

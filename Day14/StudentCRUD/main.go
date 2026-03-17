package main

import (
	"RegistrationModule/internal/data"
	"RegistrationModule/internal/route"
	"fmt"
)

func main() {
	fmt.Println("Go Packages")
	route.CreateHandler(data.DummyStudent)

}
package main

import (
	"Studentmodule/internal/data"
	"Studentmodule/internal/route"
	"fmt"
)

func main() {
	fmt.Println("Go Packages")
	route.CreateHandler(data.DummyStudent)

}

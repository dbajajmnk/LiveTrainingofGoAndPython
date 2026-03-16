package main

import (
	"Productmodule/internal/data"
	"Productmodule/internal/route"
	"fmt"
)

func main() {
	fmt.Println("Go Packages")
	route.CreateHandler(data.DummyProduct)

}

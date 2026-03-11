package main

import "fmt"

type Person struct {
	name string
	age  int
}

type Engine struct {
	company string
	power   int
	model   string
}

type Car struct {
	company string
	name    string
	engine  Engine
}

func (car Car) printInfo() {
	fmt.Println("Car", car.name)
}

func (car *Car) modifyInfo() {
	car.name = "changed"
	fmt.Println("Car", car.name)
}

func main() {
	a := Person{"Deepak", 29}
	fmt.Println(a.name)
	fmt.Println(a.age)
	eng := Engine{"Honda", 5, "V1"}
	car := Car{"Honda", "City", eng}
	fmt.Println(car.company)
	car.modifyInfo()
	car.printInfo()
}

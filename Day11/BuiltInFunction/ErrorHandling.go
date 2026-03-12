package main

import "fmt"

type Data struct {
	Value *int
}

func checkSystem() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from:", r)
		}
	}()

	fmt.Println("Starting system...")
	panic("Critical System Failure")
}

func main() {
	val := new(int)
	*val = 100

	d := Data{Value: val}
	fmt.Printf("Pointer Value: %d\n", *d.Value)

	checkSystem()
	fmt.Println("Program continues...")
}

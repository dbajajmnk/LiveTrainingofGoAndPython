package main

import "fmt"

func main() {
	// fmt.Println("Panic Testing")
	// defer fmt.Println("I will try to recover")
	// panic("Some happended which is unrecoverable")

	defer func() {
		err := recover()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println("Lets Try to recover it")
	}()
	panic("Database Connection is not there")

}

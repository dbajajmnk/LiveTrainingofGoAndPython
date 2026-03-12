package main

import "fmt"

func test() {
	fmt.Println("Going fine")
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("recovered from panic as ", r)
		}
	}()
	fmt.Println("just before panic")
	panic("error ocurred")
	// after a panic subsequent code is not executed
	fmt.Println("just after panic")
}

func main() {
	test()
	fmt.Println("Execution finished")

}

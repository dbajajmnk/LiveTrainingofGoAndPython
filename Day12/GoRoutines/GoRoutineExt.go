package main

import "fmt"

func worker(id int) {
	for i := 1; i <= 3; i++ {
		fmt.Println("worker", id, "job", i)
	}
}

func main() {
	go worker(1)
	go worker(2)

	var input string
	fmt.Scanln(&input)
}
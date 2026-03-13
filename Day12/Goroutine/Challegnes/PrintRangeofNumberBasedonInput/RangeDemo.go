package main

import (
	"fmt"
	"time"
)

/*
go key is require  to run goroutine
main exits , go rountine also exits
mean if you want to run go routine and main should be live

*/

func firstProgramforGoroutine() {
	fmt.Println("Hello From Go Rountin")

}

func main() {
	// go firstProgramforGoroutine()
	// time.Sleep(3 * time.Second)
	// fmt.Println("Goroutine Testing")
	var rangeCount int=0
	fmt.Println("Enter a number to print a range")
	fmt.Scan(&rangeCount)

	for i := range rangeCount {
		go worker(i)
	}

	time.Sleep(7 * time.Second)
	fmt.Println("Main Thread Done")
}

func worker(i int) {
	fmt.Println("Worker Started", i)

	time.Sleep(2 * time.Second)
	fmt.Println("Worker Ended", i)
}
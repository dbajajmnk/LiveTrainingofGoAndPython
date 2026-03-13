package main

import (
	"fmt"
	"time"
)

type Person struct {
	name string
	age  int
}

func main() {
	// go firstProgramforGoroutine()
	// time.Sleep(3 * time.Second)
	// fmt.Println("Goroutine Testing")
	data := Person{name: "Deepak", age: 35}
	channelOne := make(chan any)
	go sender(channelOne, data)

	time.Sleep(3 * time.Second)

	value := reciever(channelOne)

	fmt.Println(value)

}
func sender(channelOne chan any, value any) { // Create A Channel
	channelOne <- value
}

func reciever(ch chan any) any {
	return <-ch
}

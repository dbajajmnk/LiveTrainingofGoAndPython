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
	go reciever(channelOne)

	time.Sleep(3 * time.Second)

}
func sender(channelOne chan any, value any) { // Create A Channel
	channelOne <- value
}

func reciever(ch chan any) {
	fmt.Println(<-ch)
}

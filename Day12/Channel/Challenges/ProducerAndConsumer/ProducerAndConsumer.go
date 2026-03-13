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
	data := []any{Person{name: "Deepak", age: 35}, 10, true, 10.5, "string"}
	channelOne := make(chan any)
	go producer(channelOne, data)
	go cosnumer(channelOne,len(data))
	time.Sleep(20 * time.Second)

}
func producer(channelOne chan any, values []any) { // Create A Channel
	for i := 0; i < len(values); i++ {
		channelOne <- values[i]
	}
}

func cosnumer(ch chan any, rangeValue int) {
	for i := range rangeValue {
		fmt.Println(i)
		fmt.Println(<-ch)
	}
}

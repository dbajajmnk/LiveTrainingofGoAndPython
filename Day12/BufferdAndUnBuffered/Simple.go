package main

import (
	"fmt"
	"time"
)

/*
Channel
	need to be intialize using make method with capacity
	it has their data for communicaiton
	channel can recieve and send data
	reading data is required for channel(in Buffered Channel it's store data till it's capacity)
	Mean Lets say one goroutine
	Send data
	then another go routine
	need to recieve data data


*/

func main() {
	// go firstProgramforGoroutine()
	// time.Sleep(3 * time.Second)
	// fmt.Println("Goroutine Testing")
	channelOne := make(chan int, 4)
	fmt.Println(cap(channelOne))
	channelOne <- 10
	channelOne <- 20
	channelOne <- 30
	fmt.Println(cap(channelOne), len(channelOne))
	time.Sleep(3 * time.Second)

	fmt.Println("Main Exists")

	value := <-channelOne
	fmt.Println(value)
	value1 := <-channelOne
	fmt.Println(value1)
	value2 := <-channelOne
	fmt.Println(value2)

}

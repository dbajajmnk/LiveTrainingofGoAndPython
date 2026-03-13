package main

import (
	"fmt"
	"time"
)

/*
Channel
	need to be intialize using make method
	it has their data for communicaiton
	channel can recieve and send data
	reading data is required for channel (
	Mean Lets say one goroutine
	Send data
	then another go routine
	need to recieve data data


*/

func main() {
	// go firstProgramforGoroutine()
	// time.Sleep(3 * time.Second)
	// fmt.Println("Goroutine Testing")
	channelOne := make(chan int)
	go func (){// Create A Channel
	channelOne <- 10
	}()

	time.Sleep(3*time.Second)

	value := <-channelOne

	fmt.Println(value)

}

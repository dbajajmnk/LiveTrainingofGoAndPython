package main

import "fmt"

func main() {
	channelOne := make(chan int) // unbuffered channel

	go func() {
		channelOne <- 10 // send
	}()

	value := <-channelOne // receive

	fmt.Println(value)
}
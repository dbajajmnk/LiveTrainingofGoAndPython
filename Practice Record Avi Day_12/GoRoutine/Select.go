package main

import (
	"fmt"
	"time"
)

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(3 * time.Second)
		ch1 <- "message from channel 1"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- "message from channel 2"
	}()

	select {

	case msg1 := <-ch1:
		fmt.Println(msg1)

	case msg2 := <-ch2:
		fmt.Println(msg2)

	default:
		fmt.Println("No message recieved")

	}

}

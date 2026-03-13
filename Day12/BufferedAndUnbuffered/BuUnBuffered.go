//Unbuffered

package main

import (
	"fmt"
	"time"
)

func main() {
	// Capacity is 0 (default)
	ch := make(chan string)

	go func() {
		fmt.Println("Sender: Waiting to hand off...")
		ch <- "Data" // Blocks here until someone reads
		fmt.Println("Sender: Hand-off complete!")
	}()

	time.Sleep(2 * time.Second) // Simulate receiver being late
	fmt.Println("Receiver: Ready now.")
	fmt.Println("Received:", <-ch)
}


// //buffered

// package main

// import "fmt"

// func main() {
// 	// Capacity is 2
// 	ch := make(chan string, 2)

// 	// These do NOT block because the "box" has room
// 	ch <- "Message 1"
// 	ch <- "Message 2"
// 	fmt.Println("Sent 2 messages without waiting!")

// 	// This WOULD block because the buffer is now full
// 	// ch <- "Message 3" 

// 	fmt.Println(<-ch)
// 	fmt.Println(<-ch)
// }

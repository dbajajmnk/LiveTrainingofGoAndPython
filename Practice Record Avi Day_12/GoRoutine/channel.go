// package main

// import "fmt"

// func passval(ch chan int) {
// 	fmt.Println("passing value to channel")
// 	ch <- 29
// }

// func main() {

// 	// decalring a buffered channel-> by default a channel is buffered if you have not defined the capacity of that channel
// 	ch := make(chan int)

// 	go passval(ch)

// 	val := <-ch
// 	fmt.Println(val)

// 	// ch := make(chan int)

// 	// go func() {
// 	// 	ch <- 20
// 	// }()

// 	// fmt.Println(<-ch)

// }

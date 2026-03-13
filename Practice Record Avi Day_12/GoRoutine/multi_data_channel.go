// package main

// import (
// 	"fmt"
// )

// func main() {
// 	ch := make(chan any)

// 	go func() {
// 		ch <- "Hello"
// 		ch <- true
// 		ch <- 55.67
// 		ch <- 34
// 		ch <- struct {
// 			id   int
// 			name string
// 		}{16, "Navya"}
// 		close(ch)
// 	}()

// 	for value := range ch {
// 		fmt.Println(value)
// 	}

// }

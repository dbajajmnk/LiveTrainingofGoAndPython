// package main

// import "fmt"

// func main() {
// 	ch := make(chan int, 3)

// 	go func() {
// 		// ch <- 4
// 		// ch <- 5
// 		// ch <- 6
// 		for i := 0; i < cap(ch); i++ {
// 			ch <- i
// 		}
// 		close(ch)
// 	}()

// 	for value := range ch {
// 		fmt.Println(value)
// 	}

// }

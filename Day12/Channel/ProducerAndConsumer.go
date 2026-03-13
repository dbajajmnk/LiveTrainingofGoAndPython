package main

import (
	"fmt"
	"time"
)

func producer(ch chan<- int) {
	for i := 1; i <= 5; i++ {
		ch <- i
		time.Sleep(500 * time.Millisecond)
	}
	close(ch)
}

func consumer(ch <-chan int, done chan<- bool) {
	for val := range ch {
		fmt.Printf("Consumed: %d\n", val)
	}
	done <- true
}

func main() {
	dataChan := make(chan int)
	doneChan := make(chan bool)

	go producer(dataChan)
	go consumer(dataChan, doneChan)

	<-doneChan
}

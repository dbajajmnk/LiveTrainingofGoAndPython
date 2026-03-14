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
	channel2 := make(chan string)
	channel3:= make(chan bool)
	go func (){// Create A Channel
	channelOne <- 10
	}()
	go func (){// Create A Channel
	channel2 <- "I am Channel2"
	}()

	go func (){// Create A Channel
	channel3 <- true
	}()

	time.Sleep(3*time.Second)

	select {
	case value := <-channelOne:
                fmt.Println(value)
	case stringValue := <-channel2:
			fmt.Println(stringValue)
	case isTrue := <-channel3:
			fmt.Println(isTrue)
	default : fmt.Println("No Data Found")
	}

	
	
	

}

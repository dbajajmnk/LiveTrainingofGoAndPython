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
type ChannelHandler struct {
	capacity int
	data     []any
	dataSize int
	channel  chan any
}

func (channelHandler ChannelHandler) createBufferedChannel(capacity int) chan any {
	channelHandler.capacity = capacity
	channelHandler.channel = make(chan any, channelHandler.capacity)
	return channelHandler.channel
}
func (channelHandler ChannelHandler) createCancel() chan any {
	channelHandler.channel = make(chan any)
	return channelHandler.channel
}

func (channelHandler ChannelHandler) fillData(data []any) {
	channelHandler.dataSize = len(data)
	for i := 0; i < channelHandler.dataSize; i++ {
		channelHandler.channel <- i
	}

}

func (channelHandler ChannelHandler) getDataFromChannel() any {
	for i := range channelHandler.dataSize {
		fmt.Println(i)
		channelHandler.data[i] = <-channelHandler.channel
	}
	return channelHandler.data
}

func main() {
	// go firstProgramforGoroutine()
	// time.Sleep(3 * time.Second)
	// fmt.Println("Goroutine Testing")
	channelHandler := ChannelHandler{}

	channelOne := channelHandler.createBufferedChannel(2)
	//fmt.Println(cap(channelOne))
	inputData := []any{10, 20}
	channelHandler.fillData(inputData)
	//fmt.Println(cap(channelOne), len(channelOne))
	time.Sleep(3 * time.Second)

	fmt.Println("Main Exists")
	channelData := channelHandler.getDataFromChannel()
	fmt.Println("ChannelData",channelData)
	value := <-channelOne
	fmt.Println(value)
	value1 := <-channelOne
	fmt.Println(value1)
	value2 := <-channelOne
	fmt.Println(value2)

}

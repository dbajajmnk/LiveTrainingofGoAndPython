package main

import "fmt"

func main() {

	my_map := map[string]int{
		"Avichal":  23,
		"Anuj":     23,
		"Chormale": 22,
		"Ronika":   24,
		"Romika":   24,
	}
	for Key, Value := range my_map {
		fmt.Printf("Key: %s => Age: %d \n", Key, Value)

	}

}

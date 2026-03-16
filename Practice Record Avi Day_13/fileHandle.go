package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	data := []byte("Hello, Go!\nThis is a new line.")
	// The permission mode 0644 means everyone can read, but only the owner can write
	err := os.WriteFile("output.txt", data, 0644)
	if err != nil {
		log.Fatal(err) //
	}
	fmt.Println("Data written to output.txt successfully.") //
}

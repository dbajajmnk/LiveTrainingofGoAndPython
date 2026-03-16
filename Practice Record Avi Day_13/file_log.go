package main

import (
	"log"
	"os"
)

func main() {

	file, err := os.OpenFile("app.log",
		os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666)

	if err != nil {
		log.Fatal(err)
	}

	log.SetOutput(file)

	log.Println("Application started")
	log.Println("Logging to file")
}
package main

import (
	"log"
	"os"
)

func main() {
	//fetalErrorDemo()
	//normalErrorDemo()
	logFile, err := os.OpenFile("applog.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)

	if err != nil {
		log.Println("Something went wrong while trying to open file")
	} else {
		log.SetOutput(logFile)
	}
	defer logFile.Close()
	log.SetPrefix("My App")
	log.SetFlags(log.Ltime | log.Ldate | log.Lshortfile | log.Llongfile)
	normalErrorDemo()

}

func fetalErrorDemo() {
	log.Fatalln("This is logs 1")
	log.Fatalln("This is logs 2")
	log.Fatalln("This is logs 3")
	log.Fatalln("This is logs 4")
}
func normalErrorDemo() {
	log.Println("This is logs 1")
	log.Println("This is logs 2")
	log.Println("This is logs 3")
	log.Println("This is logs 4")
}

package main

import(
	"log"
	"os"
)

func main()  {
	logFile,err := os.OpenFile("append.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY,0666)

	if err != nil {
		log.Println(("Smtg went wrong while trying opening file..."))
	}else {
		log.SetOutput(logFile)
	}
	defer logFile.Close()

	log.SetOutput(logFile)
	normalErrorDemo()

}

func fetalErrorDemo()  {
	log.Fatalln("log 1")
	log.Fatalln("log 2")
	log.Fatalln("log 3")
	log.Fatalln("log 4")
	
}

func normalErrorDemo()  {
	log.Println("log 1")
	log.Println("log 2")
	log.Println("log 3")
	log.Println("log 4")
}
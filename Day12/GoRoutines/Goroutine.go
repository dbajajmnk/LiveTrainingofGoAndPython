// package main

// import (
//     "fmt"
//     "time"
// )

// func printHello() {
//     fmt.Println("Hello from goroutine")
// }

// func main() {
//     go printHello()   

//     time.Sleep(time.Second)
//     fmt.Println("Main function")
// }





package main

import (
    "fmt"
    "time"
)

func task(name string) {
    for i := 1; i <= 3; i++ {
        fmt.Println(name, i)
        time.Sleep(time.Millisecond * 500)
    }
}

func main() {
    go task("Task1")
    go task("Task2")
	go task("Task3")
	go task("Task4")
	time.Sleep(500 * time.Millisecond)
}
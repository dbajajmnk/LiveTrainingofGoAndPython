// package main

// import (
// 	"fmt"
// 	"sync"
// )

// func printHello(wg *sync.WaitGroup) {
// 	defer wg.Done()
// 	fmt.Println("Go routine 1 ended----------Bye")
// }

// func printBye(wg2 *sync.WaitGroup) {
// 	defer wg2.Done()
// 	fmt.Println("Hey Go routine 2 ended  ------- BYE from function 2")
// }

// func main() {
// 	var wg sync.WaitGroup

// 	var wg2 sync.WaitGroup

// 	wg.Add(1)
// 	go printHello(&wg)

// 	fmt.Println("Main function")

// 	wg2.Add(1)
// 	go printBye(&wg2)

// 	fmt.Println("Bye from main")

// 	wg.Wait()
// 	wg2.Wait()
// }

package main

import (
	"fmt"
	"net/http"
	_ "net/http/pprof"
	// "time"
)

func main() {
	fmt.Println("HTTP profiling")
	// go func() {
	// 	fmt.Println(http.ListenAndServe("localhost:8080", nil))
	// }()
	fmt.Println(http.ListenAndServe("localhost:8080", nil))

	// time.Sleep(10 * time.Second)
	select {}
}

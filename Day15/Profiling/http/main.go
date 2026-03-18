package main

import (
	"fmt"
	"net/http"
	_ "net/http/pprof"
)

func main() {

	fmt.Println("Http Profiling")

	// go func() {
	// 	fmt.Println(http.ListenAndServe(":8080", nil))
	// }()

	// select {}
	http.ListenAndServe(":8080", nil)

}

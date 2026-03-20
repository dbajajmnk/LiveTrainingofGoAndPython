package main

import(
	"net/http"
	_ "net/http/pprof"
	"fmt"
)

func main(){
	fmt.Println("Http Profiling")
	go func() {
		fmt.Println(http.ListenAndServe("localhost:8083",nil))
}()

select{}
}

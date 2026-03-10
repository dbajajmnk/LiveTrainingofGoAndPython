package main

import "fmt"

func main(){
	m := make(map[string]string)

	m["name"] = "golang"

	delete(m,"name")
	clear(m)

	mg := map[string]int{"price":40}

	fmt.Print(mg)
	 _,ok :=m["nama"]
	 fmt.Print((ok))

}
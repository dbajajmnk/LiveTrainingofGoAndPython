// package main

// import "fmt"

// func main(){

// }

package main

import "fmt"

type Student struct {
	name string
	age  int
	IQ   int
}

func main() {
	s1 := Student{
		name: "Avichal Tiwari",
		age:  70,
		IQ:   200,
	}
	fmt.Println(s1.age, s1.name, s1.IQ)
}

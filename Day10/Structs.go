<<<<<<< HEAD
package main

import "fmt"

type Cat struct {
	Name string
	Age  int
}

func (c Cat) Speak() {
	fmt.Println(c.Name, "says Meow!")
}

func main() {
	myCat := Cat{Name: "Kitty", Age: 5}
	fmt.Println(myCat.Name, "is", myCat.Age)
	myCat.Speak()
}
=======
package main

import "fmt"

type Cat struct {
	Name string
	Age  int
}

func (c Cat) Speak() {
	fmt.Println(c.Name, "says Meow!")
}

func main() {
	myCat := Cat{Name: "Kitty", Age: 5}
	fmt.Println(myCat.Name, "is", myCat.Age)
	myCat.Speak()
}
>>>>>>> 8a2b09a7239e378cda408e85e72b581439f55e99

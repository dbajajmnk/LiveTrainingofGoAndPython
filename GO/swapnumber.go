package main
import "fmt"

func main() {
	a := 5
	b := 10
	a = a + b
	b = a - b
	a = a - b
	fmt.Println(a, b)

	
	temp := a
	a = b
	b = temp
	fmt.Println(a, b)


}
package main

import "fmt"

func main() {
	num := []int{10, 20, 30, 40, 50}
	var ele int
	for i := 0; i < 3; i++ {
		fmt.Printf("Enter more elements appart from %d elements already there: ", len(num))
		fmt.Scan(&ele)
		num = append(num, ele)
		fmt.Println(num)
	}
	for Index, value := range num {
		fmt.Printf("Index %d => Value %d\n", Index, value)
	}
}

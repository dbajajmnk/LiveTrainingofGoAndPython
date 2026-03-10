package main
import "fmt"



func main(){
	

	var age int = 10
	fmt.Println(age)
	var isTrue bool = true
	fmt.Println(isTrue)
	var name string = "Krishna"
	fmt.Println(name)
	var price float64 = 10.9
	fmt.Println(price)



	var numbers [5]int
	numbers[0] = 10
	numbers[1] = 20
	numbers[2] = 30
	numbers[3] = 40
	numbers[4] = 50

	for i := 0; i < len(numbers); i++ {
		fmt.Println(numbers[i])
	}

	arr := [5]int{5, 10, 15, 20, 25}
	sum := 0

	for i := 0; i < len(arr); i++ {
		sum += arr[i]
	}

	fmt.Println("Sum:", sum)


}
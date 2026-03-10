package main

import "fmt"

// func greet(name string, a int, b int) {
// 	fmt.Println("Hello Mr: ", name)
// 	result := sum(a, b)
// 	fmt.Println("The sum value is ", result)
// }

// func sum(a int, b int) int {
// 	sum := a + b
// 	fmt.Println("calculating sum")
// 	return sum
// }
// type Student struct {
// 	name string
// 	age  int
// 	IQ   int
// }
func check_div(num int) string {
	if num%2 == 0 {
		return "true"
	} else {
		return "false"
	}
}

func main() {
	// fmt.Println("Hello Go")
	// var name string = "Avichal"
	// var age int = 23
	// var a, b int
	// var age int
	// name := "Avichal"
	// greet(name)
	// fmt.Println("Enter any two numbers : ")
	// fmt.Scanln(&a, &b)
	// fmt.Printf("Greeting Mr %s and calculating sum of %d and %d \n", name, a, b)
	// greet(name, a, b)
	// age := 23
	// fmt.Println(name, age)
	// var age int
	// fmt.Println("Enter your age: ")
	// fmt.Scan(&age)
	// if age >= 18 {
	// 	fmt.Println("Eligible for Job")
	// } else {
	// 	fmt.Println("Not eligible for voting")
	// }
	// for age_iter := age; age_iter >= 0; age_iter-- {
	// 	fmt.Println(age_iter)
	// }
	// for age > 0 {
	// 	fmt.Println(age)
	// 	age--
	// }

	// num := []int{10, 20, 30, 40, 50}
	// var ele int
	// for i := 0; i < 3; i++ {
	// 	fmt.Printf("Enter more elements appart from %d elements already there: ", len(num))
	// 	fmt.Scan(&ele)
	// 	num = append(num, ele)
	// 	fmt.Println(num)
	// }
	// for Index, value := range num {
	// 	fmt.Printf("Index %d => Value %d\n", Index, value)
	// }
	// my_map := map[string]int{
	// 	"Avichal":  23,
	// 	"Anuj":     23,
	// 	"Chormale": 22,
	// 	"Ronika":   24,
	// 	"Romika":   24,
	// }
	// for Key, Value := range my_map {
	// 	fmt.Printf("Key: %s => Age: %d \n", Key, Value)

	// }
	// s1 := Student{
	// 	name: "Avichal Tiwari",
	// 	age:  70,
	// 	IQ:   200,
	// }
	// fmt.Println(s1.age, s1.name, s1.IQ)
	var num int
	fmt.Println("Enter any number : ")
	fmt.Scan(&num)
	if num >= 0 {
		fmt.Println("Number is positive-----checking for divisibility-------")
	} else {
		fmt.Println("Number is negative-----checking for divisibility-------")
	}
	result := check_div(num)
	if result == "true" {
		fmt.Println("Number is ---- Even")
	} else {
		fmt.Println("Number is ---- Odd")
	}

}

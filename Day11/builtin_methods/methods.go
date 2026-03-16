package main
import "fmt"

func main() {
	// slice := make([]int,3,4)
	// slice =append(slice, 10,20,30)
	// fmt.Println(cap(slice),len(slice))

	// chanel := make(chan string)
	// chanel <- "Hurry"
	// chanel <- ""

	// var marks map[string]int
	// marks["English"]=72
	// // marks["Science"]=80
	// fmt.Println(marks)

	// marks1:=make(map[string]int)
	// marks1["English"]=72
	// marks1["Science"]=80
	// fmt.Println(marks1)
	
	arr:=[3]int{13,12,11}
	fmt.Println(min(...arr))
	fmt.Println(min("1","2","3","0"))
	fmt.Println(min("Rahul","Satyam","Kamal"))
}
package main
import "fmt"

func main() {
	marks := 85

	if marks >= 90 {
		fmt.Println("Krishna")
	} else if marks >= 75 {
		fmt.Println("Bashyal")
	} else if marks >= 60 {
		fmt.Println("Chaya")
	} else if marks >= 40 {
		fmt.Println("Daniya")
	} else {
		fmt.Println("Fatima")
	}
}
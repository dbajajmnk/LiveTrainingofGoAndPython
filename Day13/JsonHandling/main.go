package main

import (
	"encoding/json"
	"fmt"
)

/*
Marshal Struct to json
Un Marshal json to Struct
*/
type Product struct {
	Name string `json:"name"`
	cmp  Company
}

type Company struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func main() {
	fmt.Println("Json Data Handling")
	c1 := Company{ID: 1, Name: "Testing1"}
	c2 := Company{ID: 1, Name: "Testing2"}
	p1 := Product{Name: "P1", cmp: c1}
	p2 := Product{Name: "P2", cmp: c2}

	productData := []Product{p1, p2}
	jsonData, err := json.MarshalIndent(productData, "", "jjjjjjjj")

	if err != nil {
		fmt.Println("Someting when wrong while conversion")
	} else {
		fmt.Println("Json Data after Conversion", string(jsonData))

	}

	var studentAfterConversion Product
	json.Unmarshal(jsonData, &studentAfterConversion)
	fmt.Println(studentAfterConversion)

}

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
	Name string `json:"id:int"`
}

func main() {
	fmt.Println("Json Data Handling")
	p1 := Product{Name: "P1"}
	jsonData, err := json.Marshal(p1)

	if err != nil {
		fmt.Println("Someting when wrong while conversion")
	} else {
		fmt.Println("Json Data after Conversion", string(jsonData))

	}

	var studentAfterConversion Product
	json.Unmarshal(jsonData, &studentAfterConversion)
	fmt.Println(studentAfterConversion)

}

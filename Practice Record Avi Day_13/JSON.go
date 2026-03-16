package main

import (
	"encoding/json"
	"fmt"
	"log"
)


type Company struct {
	CompanyName string    `json:"company_name"`
	Location    string    `json:"location,omitempty"`
	Products    []Product `json:"products"`
}


type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

func main() {
	
	prod1 := Product{ID: 101, Name: "Laptop", Price: 999.99}
	prod2 := Product{ID: 102, Name: "Mouse", Price: 25.50}

	comp := Company{
		CompanyName: "TechCorp",
		Products:    []Product{prod1, prod2},
	}

	
	jsonData, err := json.MarshalIndent(comp, "", "  ")
	if err != nil {
		log.Fatalf("Error marshalling: %v", err)
	}
	fmt.Println("Serialized JSON:\n", string(jsonData))

	
	var decodedComp Company
	err = json.Unmarshal(jsonData, &decodedComp)
	if err != nil {
		log.Fatalf("Error unmarshalling: %v", err)
	}

	fmt.Printf("\nDecoded Struct:\n%+v\n", decodedComp)
}

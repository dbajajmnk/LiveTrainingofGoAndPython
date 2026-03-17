package main

import (
	"fmt"
	"://github.com"
)

type User struct {
	Name  string `validate:"required,min=3"`
	Email string `validate:"required,email"`
}

func main() {
	v := validator.New()
	u := User{Name: "Jo", Email: "invalid-email"}

	err := v.Struct(u)
	if err != nil {
		fmt.Println("Validation failed:")
		for _, e := range err.(validator.ValidationErrors) {
			fmt.Printf("- Field: %s, Error: %s\n", e.Field(), e.Tag())
		}
		return
	}
	fmt.Println("Validation passed!")
}

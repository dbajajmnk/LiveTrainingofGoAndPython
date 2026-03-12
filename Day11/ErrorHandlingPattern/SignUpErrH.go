package main

import (
	"errors"
	"fmt"
)

func signup(username string, password string) (string, error) {
	existingUser := "admin"

	if username == existingUser {
		return "", errors.New("username already taken")
	}
	if len(password) < 6 {
		return "", errors.New("password too short")
	}

	return "Signup successful!", nil
}

func main() {
	var user, pass string

	fmt.Print("Enter Username: ")
	fmt.Scan(&user)

	fmt.Print("Enter Password: ")
	fmt.Scan(&pass)

	msg, err := signup(user, pass)

	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println(msg)
	}
}

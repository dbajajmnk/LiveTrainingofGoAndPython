package main

import (
	"fmt"
)

type User struct {
	Username string
	Email    string
	Age      int
	Password string
}

func handleRecovery() {
	if r := recover(); r != nil {
		fmt.Println("Signup Failed:", r)
	}
}

func signupUser(u User) {
	defer handleRecovery()

	if u.Username == "" {
		panic("Username is required")
	}
	if u.Age < 18 {
		panic("User must be at least 18 years old")
	}
	if len(u.Password) < 6 {
		panic("Password is too weak")
	}

	fmt.Printf("Welcome %s! Account created for %s.\n", u.Username, u.Email)
}

func main() {
	var newUser User

	fmt.Print("Enter Username: ")
	fmt.Scan(&newUser.Username)

	fmt.Print("Enter Email: ")
	fmt.Scan(&newUser.Email)

	fmt.Print("Enter Age: ")
	fmt.Scan(&newUser.Age)

	fmt.Print("Enter Password: ")
	fmt.Scan(&newUser.Password)

	signupUser(newUser)

	fmt.Println("System ready for next user.")
}

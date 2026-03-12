package main

import (
	"errors"
	"fmt"
)

func validAgeForVote(age int) (string, error) {
	if age < 0 {
		return "", errors.New("age cannot be negative")
	}
	if age < 18 {
		return "", errors.New("not eligible: age is under 18")
	}

	return "You are Eligible for voting...", nil
}

func main() {
	userAge := 16
	message, err := validAgeForVote(userAge)

	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println(message)
}

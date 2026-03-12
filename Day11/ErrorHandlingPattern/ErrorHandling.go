package main

import (
	"errors"
	"fmt"
)

var (
	ageError    = errors.New("Invalid Age")
	invlidPhone = errors.New("Invalid Phone")
)

func validAgeForVote(age int) (int, error) {
	if age < 18 {
		return age, ageError
	}
	return age, nil
}

func validPhoneNumber(phoneNumer string) (string, error) {
	if len(phoneNumer) < 10 {
		return phoneNumer, invlidPhone
	}
	return phoneNumer, nil
}

func main() {

	age, error := validAgeForVote(10)
	phone, errorPhone := validPhoneNumber("9333333333")
	if error != nil {
		fmt.Println("Invalid Age", error)
	} else {
		fmt.Println("You are eligible for Vote", age)
	}

	if errorPhone != nil {
		fmt.Println("Invalid Age", errorPhone)
	} else {
		fmt.Println("You are eligible for Vote", phone)
	}

}

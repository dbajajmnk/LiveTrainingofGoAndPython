package main

import (
	"errors"
	"fmt"
)

type User struct {
	email string
	phone string
	dob   string
	age   int
	name  string
}

type CommonErrorHandler struct {
	errorDetail error
	msg         string
}

var (
	ageError    = errors.New("Invalid Age")
	invlidPhone = errors.New("Invalid Phone")
	dobError    = errors.New("Invalid Dob")
	nameError   = errors.New("Name is require Field")
	emailError  = errors.New("Invalid Email Id")
)

func (user User) validUserData() (bool, CommonErrorHandler) {
	if user.age < 18 {
		return false, CommonErrorHandler{ageError,
			"This is user for",
		}
	} else if user.dob == "" {
		return false, CommonErrorHandler{dobError, "This is user for"}
	}
	if user.phone == "" {
		return false, CommonErrorHandler{invlidPhone, "This is user for"}
	} else if user.email == "" {
		return false, CommonErrorHandler{emailError, "This is user for"}
	} else if user.name == "" {
		return false, CommonErrorHandler{nameError, "This is user for"}
	}
	return true, CommonErrorHandler{nil, "user is valid"}

}

// func (user User) validUserData() (bool, error) {
// 	if user.age < 18 {
// 		return false, ageError
// 	} else if user.dob == "" {
// 		return false, dobError
// 	}
// 	if user.phone == "" {
// 		return false, invlidPhone
// 	} else if user.email == "" {
// 		return false, emailError
// 	} else if user.name == "" {
// 		return false, nameError
// 	}
// 	return true, nil

// }

// func validAgeForVote(age int) (int, error) {
// 	if age < 18 {
// 		return age, ageError
// 	}
// 	return age, nil
// }

// func validPhoneNumber(phoneNumer string) (string, error) {
// 	if len(phoneNumer) < 10 {
// 		return phoneNumer, invlidPhone
// 	}
// 	return phoneNumer, nil
// }

// func main() {

// 	age, error := validAgeForVote(10)
// 	phone, errorPhone := validPhoneNumber("9333333333")
// 	if error != nil {
// 		fmt.Println("Invalid Age", error)
// 	} else {
// 		fmt.Println("You are eligible for Vote", age)
// 	}

//	if errorPhone != nil {
//		fmt.Println("Invalid Age", errorPhone)
//	} else {
//
//		fmt.Println("You are eligible for Vote", phone)
//	}
func main() {
	user := User{"deepakbajaj79@gmal.com",
		"94344444344334",
		"dob",
		30,
		"testing",
	}
	isValid, commonError := user.validUserData()

	if commonError.errorDetail != nil {
		fmt.Println(commonError.errorDetail)
	} else {
		fmt.Println(isValid)
	}

}

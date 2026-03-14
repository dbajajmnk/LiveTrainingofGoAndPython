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
type Card struct {
	user         User
	cardNumber   string
	validateDate string
	pin          string
}

type Payment struct {
	amount float64
	card   Card
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

func returnRespons(validationError error, message string, isValid bool) (bool, CommonErrorHandler) {
	return isValid, CommonErrorHandler{validationError, message}
}

func (card Card) validateCard() (bool, CommonErrorHandler) {
	if card.user.name == "" {
		return returnRespons(ageError, "User name is required", false)
	} else if card.cardNumber == "" {
		return returnRespons(ageError, "User name is required", false)
	} else if card.pin == "" {
		return returnRespons(ageError, "User name is required", false)
	} else if card.validateDate == "" {
		return returnRespons(ageError, "User name is required", false)
	}
	return returnRespons(nil, "Card Validation Done", true)

}
func (payment Payment) validPayment() (bool, CommonErrorHandler) {
	if payment.amount < 1800 {
		return returnRespons(ageError, "Amount is not sufficient", false)
	}
	isCardValid, cardError := payment.card.validateCard()
	if !isCardValid {
		return returnRespons(cardError.errorDetail, "Valid Payment"+cardError.msg, isCardValid)
	}
	return returnRespons(nil, "User Payment Details Verified", true)
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
	deepak := User{"deepakbajaj79@gmal.com",
		"94344444344334",
		"dob",
		30,
		"testing",
	}
	card := Card{user: deepak, cardNumber: "344444", validateDate: "1 month", pin: "100"}

	shopingPayment := Payment{amount: 20000, card: card}

	isValid, commonError := deepak.validUserData()
	if commonError.errorDetail != nil {
		fmt.Println(commonError.errorDetail)
	} else {
		fmt.Println(isValid)
	}
	
	defer func(){
		errorOfPay :=recover(); if errorOfPay!=nil {
			fmt.Println("Recoverd Option opened")
		}
	}()
	for i:=range(5){
	
	if(i==3){
		panic("Condition Failed")
	}else{
		isValid1, commonError1 := shopingPayment.validPayment()
	if commonError1.errorDetail != nil {
		fmt.Println(commonError.errorDetail)
	} else {
		fmt.Println(isValid1)
	}
	}
	

	}
	

}

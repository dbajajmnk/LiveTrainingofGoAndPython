package main

import "testing"

func TestLogin(t *testing.T) {
	myTestUser := User{
		Name:  "Avi",
		Email: "avi@example.com"}
	err := myTestUser.isLoginSuccessful()

	if err != nil {
		t.Errorf("Sorry Invalid user details")
	}
}

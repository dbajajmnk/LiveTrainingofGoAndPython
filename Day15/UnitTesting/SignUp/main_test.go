package main

import "testing"

func TestLogin(t *testing.T) {
	myTestUser := User{Name: "Deepak", Email: "deepak@gmail.com"}
	err := myTestUser.isLoginSuccessful()

	if err != nil {
		t.Errorf("Sorry Invalid user Detail")
	}
}

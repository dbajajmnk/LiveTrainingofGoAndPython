package main

import "testing"
func TestLogin(t *testing.T)  {
	myTestUser := User{Name: "Yunus", Email:"yun@gmail.com"}
	err:=myTestUser.isLoginSuccessful()
	if err!=nil{
		t.Errorf("Sorry Invalid user Details")
	}
}
package main

import "errors"

type User struct{
	Name string
	Email string
}

func (u User) isLoginSuccessful() error  {
	if u.Name==""{
		return errors.New("Invalid User Name")
	}else if u.Email==""{
		return errors.New("Invalid ")
	}
	return nil
}
package main

import (
	"errors"
)

type User struct {
	Name  string
	Email string
}

func (u User) isLoginSuccessful() error {
	if u.Name == "" {
		return errors.New("Name is empty")
	}
	if u.Email == "" {
		return errors.New("Email is empty")
	}
	return nil
}

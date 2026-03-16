package util

import (
	"Studentmodule/internal/data"
	"Studentmodule/internal/model"
	"errors"
)

func ValidateStudent(student model.Student) (model.Student, error) {
	
	if student.ID == 0 {

	} else if student.Name == data.EmptyString {
		return student,errors.New("Name is required")

	} else if student.Email == data.EmptyString {
		return student,errors.New("Email is required")

	} else if student.Phone == data.EmptyString {
		return student,errors.New("Phone is required")

	} else if student.Age < data.ValidAge {
		return student,errors.New("Invalid Age")
	}
	return student,nil

}

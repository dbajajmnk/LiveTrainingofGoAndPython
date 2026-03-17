package service

import (
	"RegistrationModule/internal/data"
	"RegistrationModule/internal/model"
	"fmt"
)

func CreateStudent(request model.Student) (model.Student, error) {

	return request, nil
}
func UpdateStudent(id int, request model.Student) (model.Student, error) {
	fmt.Println(id)
	return request, nil
}
func GetStudentyId(id int) (model.Student, error) {
	fmt.Println(id)
	studentResult := model.Student{}
	return studentResult, nil
}
func GetAllStudent() ([]model.Student, error) {

	return data.Students, nil
}
func DeleteStudent(id int) (model.Student, error) {
	fmt.Println(id)
	studentResult := data.Students[0]
	return studentResult, nil
}
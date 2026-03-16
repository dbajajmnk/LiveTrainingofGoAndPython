package route

import (
	"RegistrationModule/internal/model"
	"RegistrationModule/internal/service"
	"fmt"
)

func CreateHandler(student model.Student) {
	result, err := service.CreateStudent(student)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func UpdateHandler(id int, student model.Student) {
	result, err := service.UpdateStudent(id, student)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func DeleteHandler(id int) {
	result, err := service.DeleteStudent(id)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func GetByIdHandler(id int) {
	result, err := service.GetStudentyId(id)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func getAllHandler(student model.Student) {
	result, err := service.GetAllStudent()
	if err == nil {
		fmt.Println("Result", result)
	}

}
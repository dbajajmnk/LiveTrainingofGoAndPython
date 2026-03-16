package route

import (
	"Productmodule/internal/model"
	"Productmodule/internal/service"
	"fmt"
)

func CreateHandler(Product model.Product) {
	result, err := service.CreateProduct(Product)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func UpdateHandler(id int, Product model.Product) {
	result, err := service.UpdateProduct(id, Product)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func DeleteHandler(id int) {
	result, err := service.DeleteProduct(id)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func GetByIdHandler(id int) {
	result, err := service.GetProductyId(id)
	if err == nil {
		fmt.Println("Result", result)
	}

}
func getAllHandler(Product model.Product) {
	result, err := service.GetAllProduct()
	if err == nil {
		fmt.Println("Result", result)
	}

}

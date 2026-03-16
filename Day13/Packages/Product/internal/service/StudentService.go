package service

import (
	"Productmodule/internal/data"
	"Productmodule/internal/model"
	"fmt"
)

func CreateProduct(request model.Product) (model.Product, error) {

	return request, nil
}
func UpdateProduct(id int, request model.Product) (model.Product, error) {
	fmt.Println(id)
	return request, nil
}
func GetProductyId(id int) (model.Product, error) {
	fmt.Println(id)
	ProductResult := model.Product{}
	return ProductResult, nil
}
func GetAllProduct() ([]model.Product, error) {

	return data.Products, nil
}
func DeleteProduct(id int) (model.Product, error) {
	fmt.Println(id)
	ProductResult := data.Products[0]
	return ProductResult, nil
}

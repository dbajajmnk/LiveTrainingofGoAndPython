package util

import (
	"Productmodule/internal/data"
	"Productmodule/internal/model"
	"errors"
)

func ValidateProduct(Product model.Product) (model.Product, error) {
	
	if Product.ID == 0 {

	} else if Product.Name == data.EmptyString {
		return Product,errors.New("Name is required")

	} 
		
	return Product,nil

}

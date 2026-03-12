/*
*
Interface :
Discount
increment
decrement

# Total for method

# Product

*
*/
package main

import "fmt"

type Discount interface {
	getDiscount(discountAmt int ) int
}

type Product struct {
	name    string
	company string
	price   int
	sku     string
	use     string
}

type Shoe struct {
	product   Product
	isFloater bool
}

type TShirt struct {
	product Product
	size    int
}

func (product Product) useCase() string {
	return product.use
}

func (product Product) getDiscount(discountAmt int) int {
	return product.price - discountAmt
}

func main() {
	product1 := Product{name: "Adidas 12", price: 100, company: "Adidas", sku: "Sku", use: "Foot wear"}
	product2 := Product{name: "Blue Tshir", price: 150, company: "Adidas", sku: "Sku", use: "Clothing"}

	fmt.Println(product1.useCase())
	fmt.Println(product2.useCase())
	fmt.Println(product1.getDiscount(40))
	fmt.Println(product2.getDiscount(30))

}

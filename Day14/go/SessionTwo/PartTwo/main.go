package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Product struct {
	ID    int
	Name  string
	Price float64
}

type CreateProductRequest struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type UpdateProductRequest struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type ProductResponse struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var products []Product
var nextID = 1

type ProductService struct{}

func (s *ProductService) Create(req CreateProductRequest) ProductResponse {
	product := Product{
		ID:    nextID,
		Name:  req.Name,
		Price: req.Price,
	}
	nextID++
	products = append(products, product)

	return ProductResponse{
		ID:    product.ID,
		Name:  product.Name,
		Price: product.Price,
	}
}

func (s *ProductService) GetAll() []ProductResponse {
	var result []ProductResponse
	for _, p := range products {
		result = append(result, ProductResponse{
			ID:    p.ID,
			Name:  p.Name,
			Price: p.Price,
		})
	}
	return result
}

func (s *ProductService) GetByID(id int) (ProductResponse, bool) {
	for _, p := range products {
		if p.ID == id {
			return ProductResponse{
				ID:    p.ID,
				Name:  p.Name,
				Price: p.Price,
			}, true
		}
	}
	return ProductResponse{}, false
}

func (s *ProductService) Update(id int, req UpdateProductRequest) (ProductResponse, bool) {
	for i, p := range products {
		if p.ID == id {
			products[i].Name = req.Name
			products[i].Price = req.Price

			return ProductResponse{
				ID:    products[i].ID,
				Name:  products[i].Name,
				Price: products[i].Price,
			}, true
		}
	}
	return ProductResponse{}, false
}

func (s *ProductService) Delete(id int) bool {
	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			return true
		}
	}
	return false
}

type ProductController struct {
	service *ProductService
}

func (pc *ProductController) CreateProduct(c *gin.Context) {
	var req CreateProductRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	result := pc.service.Create(req)
	c.JSON(http.StatusCreated, result)
}

func (pc *ProductController) GetProducts(c *gin.Context) {
	result := pc.service.GetAll()
	c.JSON(http.StatusOK, result)
}

func (pc *ProductController) GetProductByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	result, found := pc.service.GetByID(id)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (pc *ProductController) UpdateProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var req UpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	result, found := pc.service.Update(id, req)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (pc *ProductController) DeleteProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	deleted := pc.service.Delete(id)
	if !deleted {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "product deleted successfully"})
}

func main() {
	r := gin.Default()

	productService := &ProductService{}
	productController := &ProductController{service: productService}

	r.POST("/products", productController.CreateProduct)
	r.GET("/products", productController.GetProducts)
	r.GET("/products/:id", productController.GetProductByID)
	r.PUT("/products/:id", productController.UpdateProduct)
	r.DELETE("/products/:id", productController.DeleteProduct)

	r.Run(":8080")
}

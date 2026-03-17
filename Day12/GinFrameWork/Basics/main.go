package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Product struct {
	ID    int
	Name  string
	Price float64 `json:"price"`
}

var nextId int = 1

type ProductRequest struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}
type ProductResponse struct {
	ID    int     `json:id`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var products []Product

type ProductService struct{}

func main() {
	fmt.Println("Gin Basics")

	r := gin.Default()
	r.Group("api")
	{
		r.GET("/home", homeHandlerfunc)
		r.GET("/user", GetHandler)
		r.POST("/user", postHandler)
		r.PUT("/user/:id", updateHandler)
		r.DELETE("/user", delteHandler)
	}
	r.Run(":8080")
}

type Controller struct {
	service *ProductService
}

func (service ProductService) getAllProduct() []Product {
	return products
}

func GetHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Get Called",
	})
}
func postHandler(c *gin.Context) {
	var newProduct Product

	err := c.ShouldBindJSON(&newProduct)
	if err != nil {
		c.JSON(http.StatusExpectationFailed, gin.H{
			"message": "Body is not avialble",
		})
	} else {
		c.JSON(http.StatusOK, newProduct)
	}

}
func delteHandler(c *gin.Context) {
	urlPath := c.Request.URL.Path
	fmt.Println("path", urlPath)
	c.JSON(http.StatusOK, gin.H{
		"message": "Post Called",
	})
}
func homeHandlerfunc(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Home Called",
	})
}
func updateHandler(c *gin.Context) {
	queryParams := c.Request.URL.Path
	fmt.Println("Query", queryParams)
	c.JSON(http.StatusOK, gin.H{
		"message": "Update Called",
	})
}

func getAllProducts()
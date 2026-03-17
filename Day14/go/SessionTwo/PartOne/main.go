package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Product struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

func getProducts(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "All products",
	})
}

func getProductByID(c *gin.Context) {
	id := c.Param("id")

	c.JSON(http.StatusOK, gin.H{
		"message": "Single product",
		"id":      id,
	})
}

func createProduct(c *gin.Context) {
	var product Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Product created",
		"product": product,
	})
}

func main() {
	r := gin.Default()

	api := r.Group("/api")
	{
		api.GET("/products", getProducts)
		api.GET("/products/:id", getProductByID)
		api.POST("/products", createProduct)
	}

	r.Run(":8080")
}

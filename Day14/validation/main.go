package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateProduct struct {
	Title string `json:"title" binding:"required,min=10,max=20"`
	Email string `json:"email" binding:"required,email"`
	Phone string `json:"phone" binding:"required,gte=10,lte=12"`
}

func createUser(c *gin.Context) {
	var req CreateProduct

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "valid request",
		"data":    req,
	})
}

func main() {
	r := gin.Default()

	r.POST("/users", createUser)

	r.Run(":8080")
}

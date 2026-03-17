package main

import (
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Product is the database model
type Product struct {
	ID    uint    `json:"id" gorm:"primaryKey"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Stock int     `json:"stock"`
}

// ProductRequest is used for both create and update
type ProductRequest struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Stock int     `json:"stock"`
}

func main() {
	// Gin router
	r := gin.Default()

	// Open SQLite database
	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Create table if not exists
	if err := db.AutoMigrate(&Product{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// Home route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Gin + GORM + SQLite CRUD API is running",
		})
	})

	// CREATE
	r.POST("/products", func(c *gin.Context) {
		var req ProductRequest

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "invalid request body",
			})
			return
		}

		if err := validateProductRequest(req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		product := Product{
			Name:  strings.TrimSpace(req.Name),
			Price: req.Price,
			Stock: req.Stock,
		}

		if err := db.Create(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to create product",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "product created successfully",
			"data":    product,
		})
	})

	// READ ALL
	r.GET("/products", func(c *gin.Context) {
		var products []Product

		if err := db.Find(&products).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to fetch products",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "products fetched successfully",
			"data":    products,
		})
	})

	// READ ONE
	r.GET("/products/:id", func(c *gin.Context) {
		productID, ok := parseID(c)
		if !ok {
			return
		}

		var product Product
		if err := db.First(&product, productID).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "product not found",
				})
				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to fetch product",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "product fetched successfully",
			"data":    product,
		})
	})

	// UPDATE
	r.PUT("/products/:id", func(c *gin.Context) {
		productID, ok := parseID(c)
		if !ok {
			return
		}

		var req ProductRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "invalid request body",
			})
			return
		}

		if err := validateProductRequest(req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		var product Product
		if err := db.First(&product, productID).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "product not found",
				})
				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to fetch product",
			})
			return
		}

		product.Name = strings.TrimSpace(req.Name)
		product.Price = req.Price
		product.Stock = req.Stock

		if err := db.Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to update product",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "product updated successfully",
			"data":    product,
		})
	})

	// DELETE
	r.DELETE("/products/:id", func(c *gin.Context) {
		productID, ok := parseID(c)
		if !ok {
			return
		}

		var product Product
		if err := db.First(&product, productID).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "product not found",
				})
				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to fetch product",
			})
			return
		}

		if err := db.Delete(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to delete product",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "product deleted successfully",
		})
	})

	// Start server
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

// parseID converts path param to int
func parseID(c *gin.Context) (int, bool) {
	id := c.Param("id")

	productID, err := strconv.Atoi(id)
	if err != nil || productID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid id",
		})
		return 0, false
	}

	return productID, true
}

// validate request body
func validateProductRequest(req ProductRequest) error {
	if strings.TrimSpace(req.Name) == "" {
		return errors.New("name is required")
	}
	if req.Price < 0 {
		return errors.New("price cannot be negative")
	}
	if req.Stock < 0 {
		return errors.New("stock cannot be negative")
	}
	return nil
}

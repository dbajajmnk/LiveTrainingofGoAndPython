package main

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("my-secret-key")
var secretKey2 = []byte("my-secret-key_hello")

// =======================
// LOGIN REQUEST DTO
// =======================
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// =======================
// GENERATE TOKEN
// =======================
func generateToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(1 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
}

// =======================
// LOGIN HANDLER
// =======================
func loginHandler(c *gin.Context) {
	var req LoginRequest

	// bind request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	// simple hardcoded check
	if req.Username != "admin" || req.Password != "admin123" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	// generate token
	token, err := generateToken(req.Username)
	fmt.Println("Token", token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "login successful",
		"token":   token,
	})
}

// =======================
// AUTH MIDDLEWARE
// =======================
func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		// get header
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			c.Abort()
			return
		}

		// expected format: Bearer <token>
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token format"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// parse token
		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			return secretKey2, nil
		})
		fmt.Println("Hello Friends", token)

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// optional: read claims
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Set("username", claims["username"])
		}

		// continue
		c.Next()
	}
}

// =======================
// PROTECTED HANDLER
// =======================
func profileHandler(c *gin.Context) {

	username, _ := c.Get("username")

	c.JSON(http.StatusOK, gin.H{
		"message":  "protected data",
		"username": username,
	})
}

// =======================
// MAIN
// =======================
func main() {
	r := gin.Default()

	// public route
	r.POST("/login", loginHandler)

	// protected routes
	protected := r.Group("/api")
	protected.Use(authMiddleware())
	{
		protected.GET("/profile", profileHandler)
	}

	r.Run(":8080")
}

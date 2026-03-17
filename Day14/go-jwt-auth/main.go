package main

import (
	"fmt"
	"net/http"

	"go-jwt-auth/handlers"
	"go-jwt-auth/middleware"
)

func main() {

	http.HandleFunc("/login", handlers.Login)
	http.HandleFunc("/dashboard", middleware.AuthMiddleware(handlers.Dashboard))

	fmt.Println("Server running on :8080")

	http.ListenAndServe(":8080", nil)
}
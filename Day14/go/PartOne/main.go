package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// ============================
// MODEL
// ============================
type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var products = []Product{
	{ID: 1, Name: "Laptop", Price: 50000},
	{ID: 2, Name: "Mobile", Price: 20000},
}

// ============================
// MIDDLEWARE
// ============================

// Logging middleware
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		log.Println("Request:", r.Method, r.URL.Path)

		next(w, r)

		log.Println("Completed in:", time.Since(start))
	}
}

// Simple auth middleware
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		token := r.Header.Get("Authorization")

		if token != "Bearer secret123" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next(w, r)
	}
}

// ============================
// HANDLERS
// ============================

// Home
func homeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to net/http API"))
}

// ============================
// QUERY PARAM EXAMPLE
// GET /search?name=laptop
// ============================
func searchHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	response := map[string]string{
		"search": name,
	}

	json.NewEncoder(w).Encode(response)
}

// ============================
// GET ALL PRODUCTS
// ============================
func getProducts(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(products)
}

// ============================
// PATH PARAM (manual)
// GET /products/1
// ============================
func getProductByID(w http.ResponseWriter, r *http.Request) {

	// extract id manually
	parts := strings.Split(r.URL.Path, "/")
	idStr := parts[len(parts)-1]

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	for _, p := range products {
		if p.ID == id {
			json.NewEncoder(w).Encode(p)
			return
		}
	}

	http.Error(w, "Product not found", http.StatusNotFound)
}

// ============================
// POST (REQUEST BODY)
// ============================
func createProduct(w http.ResponseWriter, r *http.Request) {

	var p Product

	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	p.ID = len(products) + 1
	products = append(products, p)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

// ============================
// PUT (UPDATE)
// ============================
func updateProduct(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	idStr := parts[len(parts)-1]

	id, _ := strconv.Atoi(idStr)

	var updated Product
	json.NewDecoder(r.Body).Decode(&updated)

	for i, p := range products {
		if p.ID == id {
			products[i].Name = updated.Name
			products[i].Price = updated.Price

			json.NewEncoder(w).Encode(products[i])
			return
		}
	}

	http.Error(w, "Not found", http.StatusNotFound)
}

// ============================
// DELETE
// ============================
func deleteProduct(w http.ResponseWriter, r *http.Request) {

	parts := strings.Split(r.URL.Path, "/")
	idStr := parts[len(parts)-1]

	id, _ := strconv.Atoi(idStr)

	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			fmt.Fprintln(w, "Deleted successfully")
			return
		}
	}

	http.Error(w, "Not found", http.StatusNotFound)
}

// ============================
// HEADERS EXAMPLE
// ============================
func headerExample(w http.ResponseWriter, r *http.Request) {

	client := r.Header.Get("Client-Type")

	response := map[string]string{
		"client": client,
	}

	json.NewEncoder(w).Encode(response)
}

// ============================
// MAIN
// ============================
func main() {

	http.HandleFunc("/", loggingMiddleware(homeHandler))

	http.HandleFunc("/search", loggingMiddleware(searchHandler))

	http.HandleFunc("/products", loggingMiddleware(getProducts))

	http.HandleFunc("/products/", loggingMiddleware(getProductByID))

	http.HandleFunc("/create", loggingMiddleware(authMiddleware(createProduct)))

	http.HandleFunc("/update/", loggingMiddleware(authMiddleware(updateProduct)))

	http.HandleFunc("/delete/", loggingMiddleware(authMiddleware(deleteProduct)))

	http.HandleFunc("/header", loggingMiddleware(headerExample))

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

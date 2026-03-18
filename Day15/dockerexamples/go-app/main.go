package main

import (
	"fmt"
	"net/http"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from Go Docker!")
}

func main() {
	http.HandleFunc("/", home)
	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", nil)
}

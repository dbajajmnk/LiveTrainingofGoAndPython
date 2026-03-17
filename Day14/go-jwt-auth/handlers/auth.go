package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"go-jwt-auth/models"
	"go-jwt-auth/utils"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {

	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if user.Username != "admin" || user.Password != "1234" {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateToken(user.Username)

	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}

func Dashboard(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to Dashboard ")
}

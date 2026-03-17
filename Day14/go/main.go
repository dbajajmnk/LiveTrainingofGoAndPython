package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/home", createUser)
	http.ListenAndServe(":8080", nil)
}

func createUser(w http.ResponseWriter, r *http.Request) {




	fmt.Fprintf(w, "hello From Basic of Rest API for Go")

}

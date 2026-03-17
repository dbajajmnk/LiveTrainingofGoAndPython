package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Topic One--- net/http for Rest API in Go")
	/**
	Basic Routing
	HanderFun Done
	Handler Done
	ResponeWriter
	Request
	*/

	//mux := http.NewServeMux()
	// http.HandleFunc("/home", homeHandler)
	// http.HandleFunc("/home2", homeHandler2)
	// mux.HandleFunc("/home", homeHandler)

	// mux.HandleFunc("/home2", homeHandler2)
	// loggerMux := loggerMiddleWare(mux)
	//http.ListenAndServe(":8080", loggerMux)

	http.HandleFunc("/home", homeHandler)
	http.HandleFunc("/home2", loggerMiddleWare(homeHandler2))
	http.ListenAndServe(":8080", nil)

}
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from Rest API in Go")

}
func homeHandler2(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodGet:
		GetDemo(w, r)
	case http.MethodPost:
		PostDemo(w, r)
	case http.MethodDelete:
		DeleteDemo(w, r)
	case http.MethodPut:
		PutDemo(w, r)
	default:
		NotImplemented(w, r)
	}

}

func NotImplemented(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Method Not Implemeted")

}

func GetDemo(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Get Demo")

}

func PostDemo(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Post Demo")

}

func PutDemo(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Put Demo")

}
func DeleteDemo(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Delete Demo")

}
func loggerMiddleWare(next http.HandlerFunc) http.HandlerFunc {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Method", r.Method)
		fmt.Println("Body", r.Body)
		next.ServeHTTP(w, r)
	})
}

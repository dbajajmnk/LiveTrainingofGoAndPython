Here is a **single-file, simple, beginner-friendly** `main.go` for a **REST API using `net/http`**.

It covers:

* GET all students
* GET student by ID
* POST create student
* PUT update student
* DELETE student

---

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

// Student represents one student record
type Student struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

// In-memory data store
var students = map[int]Student{
	1: {ID: 1, Name: "Rahul", Email: "rahul@example.com", Age: 21},
	2: {ID: 2, Name: "Priya", Email: "priya@example.com", Age: 22},
}

// To generate new IDs
var nextID = 3

func main() {
	// Route for collection operations
	http.HandleFunc("/students", studentsHandler)

	// Route for single student operations
	http.HandleFunc("/students/", studentByIDHandler)

	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

// studentsHandler handles:
// GET  /students
// POST /students
func studentsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getAllStudents(w, r)
	case http.MethodPost:
		createStudent(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// studentByIDHandler handles:
// GET    /students/{id}
// PUT    /students/{id}
// DELETE /students/{id}
func studentByIDHandler(w http.ResponseWriter, r *http.Request) {
	id, err := getIDFromPath(r.URL.Path)
	if err != nil {
		http.Error(w, "Invalid student ID", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		getStudentByID(w, r, id)
	case http.MethodPut:
		updateStudent(w, r, id)
	case http.MethodDelete:
		deleteStudent(w, r, id)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// GET /students
func getAllStudents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Convert map to slice
	var studentList []Student
	for _, student := range students {
		studentList = append(studentList, student)
	}

	json.NewEncoder(w).Encode(studentList)
}

// GET /students/{id}
func getStudentByID(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")

	student, exists := students[id]
	if !exists {
		http.Error(w, "Student not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(student)
}

// POST /students
func createStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newStudent Student

	err := json.NewDecoder(r.Body).Decode(&newStudent)
	if err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if newStudent.Name == "" || newStudent.Email == "" || newStudent.Age <= 0 {
		http.Error(w, "Name, email, and valid age are required", http.StatusBadRequest)
		return
	}

	newStudent.ID = nextID
	nextID++
	students[newStudent.ID] = newStudent

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newStudent)
}

// PUT /students/{id}
func updateStudent(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")

	_, exists := students[id]
	if !exists {
		http.Error(w, "Student not found", http.StatusNotFound)
		return
	}

	var updatedStudent Student
	err := json.NewDecoder(r.Body).Decode(&updatedStudent)
	if err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if updatedStudent.Name == "" || updatedStudent.Email == "" || updatedStudent.Age <= 0 {
		http.Error(w, "Name, email, and valid age are required", http.StatusBadRequest)
		return
	}

	updatedStudent.ID = id
	students[id] = updatedStudent

	json.NewEncoder(w).Encode(updatedStudent)
}

// DELETE /students/{id}
func deleteStudent(w http.ResponseWriter, r *http.Request, id int) {
	_, exists := students[id]
	if !exists {
		http.Error(w, "Student not found", http.StatusNotFound)
		return
	}

	delete(students, id)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Student deleted successfully",
	})
}

// Helper function to extract ID from path like /students/1
func getIDFromPath(path string) (int, error) {
	parts := strings.Split(path, "/")
	if len(parts) != 3 || parts[2] == "" {
		return 0, fmt.Errorf("invalid path")
	}

	id, err := strconv.Atoi(parts[2])
	if err != nil {
		return 0, err
	}

	return id, nil
}
```

## How to run

```bash
go run main.go
```

Server will start on:

```bash
http://localhost:8080
```

## Test APIs

### 1. Get all students

```bash
curl http://localhost:8080/students
```

### 2. Get student by ID

```bash
curl http://localhost:8080/students/1
```

### 3. Create student

```bash
curl -X POST http://localhost:8080/students ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"Amit\",\"email\":\"amit@example.com\",\"age\":23}"
```

### 4. Update student

```bash
curl -X PUT http://localhost:8080/students/1 ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"Rahul Sharma\",\"email\":\"rahul.sharma@example.com\",\"age\":24}"
```

### 5. Delete student

```bash
curl -X DELETE http://localhost:8080/students/1
```

## Beginner notes

* `http.HandleFunc()` registers routes
* `r.Method` checks request type
* `json.NewDecoder(r.Body).Decode()` reads JSON input
* `json.NewEncoder(w).Encode()` sends JSON output
* `map[int]Student` is used as a simple in-memory database

I can also give you a **more classroom-friendly version with very short comments after every line**.


############# Middle ware example ###########
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Request Method:", r.Method)
		fmt.Println("Request URL:", r.URL.Path)

		next.ServeHTTP(w, r)
	})
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from Go API")
}

func main() {

	mux := http.NewServeMux()

	mux.HandleFunc("/hello", helloHandler)

	loggedMux := loggingMiddleware(mux)

	fmt.Println("Server running at :8080")

	http.ListenAndServe(":8080", loggedMux)
}
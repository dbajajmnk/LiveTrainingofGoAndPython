package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func main() {
    u := User{ID: 1, Name: "Harry"}

    
    data, _ := json.MarshalIndent(u, "", "  ")
    _ = os.WriteFile("user.json", data, 0644)

    
    var u2 User
    content, _ := os.ReadFile("user.json")
    json.Unmarshal(content, &u2)

    fmt.Printf("%+v\n", u2)
}

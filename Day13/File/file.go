package main

import (
    "fmt"
    "os"
)

func main() {
    content, err := os.ReadFile("example.txt")
    if err != nil {
        fmt.Println("Error reading file:", err)
        return
    }

    fmt.Println(string(content))
}

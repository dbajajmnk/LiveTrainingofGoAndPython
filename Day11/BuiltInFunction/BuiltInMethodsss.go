package main

import "fmt"

func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("Recovered: %v\n", r)
		}
	}()

	s := make([]int, 2, 5)
	s[0] = 10
	s[1] = 20

	s = append(s, 30, 40)

	c := make([]int, len(s))
	copy(c, s)

	m := make(map[string]int)
	m["A"] = 100
	m["B"] = 200
	delete(m, "A")

	p := new(int)
	*p = 500

	fmt.Printf("Slice: %v | Len: %d | Cap: %d\n", s, len(s), cap(s))
	fmt.Printf("Map: %v | Pointer: %d\n", m, *p)

	if len(m) < 5 {
		panic("Not enough map data")
	}
}

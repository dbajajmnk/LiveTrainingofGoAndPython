package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
}

type Circle struct {
	Radius float64
}

type Square struct {
	Side float64
}

func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func (s Square) Area() float64 {
	return s.Side * s.Side
}

func printArea(sh Shape) {
	fmt.Printf("Area: %.2f\n", sh.Area())
}

func main() {
	c := Circle{Radius: 5}
	s := Square{Side: 4}

	printArea(c)
	printArea(s)
}

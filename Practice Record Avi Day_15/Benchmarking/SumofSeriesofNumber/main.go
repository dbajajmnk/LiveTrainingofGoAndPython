package main

import (
	"fmt"
)

/**
Benchmark function should be a part of test file only
Benchmark function should be a function that
starts with "Benchmark" and takes a pointer to
testing.B as a parameter. The testing.B type
provides methods for controlling the benchmark
execution and reporting results.

Command to run
go test -bench=.
go test count=1 -bench=Benchmark -run=^$

Here's an example of a benchmark function for
the SumWithLoop function and SumWithFormula function:
*/

func SumWithLoop(n int) int {
	sum := 0
	for i := 0; i <= n; i++ {
		sum += i
	}
	return sum
}

func SumWithFormula(n int) int {

	sum := n * (n + 1) / 2

	return sum
}

func main() {

	sumTest := SumWithFormula(10)
	fmt.Println(sumTest)
	sumTest = SumWithLoop(10)
	fmt.Println(sumTest)
}

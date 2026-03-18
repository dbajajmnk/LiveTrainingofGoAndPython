package main

import (
	"fmt"
)

/**
Benchmark functions should be a part of test file only
Function name start with Benchmark
Module is required to run test case

Command to run
go mod init modulename
go test
go test -v (verbose)
go test -bench=.
go test count=1 -bench=Benchmark -run=^$

*/

func SumWithLoop(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
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

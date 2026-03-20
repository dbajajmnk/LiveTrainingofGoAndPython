package main

/**
Benchmark function should be a part of test file only
Function name start with Benchmark
Command to run
go test -bench=.
go test count=1 -bench=Benchmark -run=^$
*/

import "fmt"


func SumWithLoop(n int )int  {
	sum:=0
	for i := 0; i <= n; i++ {
		sum+=i
	}
	return  sum
}

func SumWithFormula(n int) int  {
	sum := n*(n+1)/2
	
	return sum
	
}

func main()  {
	sumTest:=SumWithFormula(10)
	fmt.Println(sumTest)
	sumTest=SumWithLoop(10)
	fmt.Println(sumTest)
	
}
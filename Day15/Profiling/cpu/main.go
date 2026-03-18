package main

import (
	"fmt"
	"os"
	"runtime/pprof"
)

/**
go tool pprof cpu.prof

*/

func SlowFunction(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum
}

func main() {
	fl, err := os.Create("cpu.prof")
	if err != nil {
		fmt.Println("Unable to Open File", fl)
	}
	defer fl.Close()
	pprof.StartCPUProfile(fl)

	defer pprof.StopCPUProfile()
	sum := SlowFunction(10_000_000)
	fmt.Println("sum ", sum)

}

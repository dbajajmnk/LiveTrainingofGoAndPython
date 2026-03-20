package main

import (
	"fmt"
	"os"

	// "root/pprof"
	"runtime/pprof"
)

func SlowFunction(n int) int {
	sum := 0
	for i := 0; i <= 10_000_000_000; i++ {
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
	sum := SlowFunction(10_000_000_000_00)
	fmt.Println("Sum:", sum)
}

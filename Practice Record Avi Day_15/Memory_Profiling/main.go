package main

import (
	"fmt"
	"os"
	"runtime"
	"runtime/pprof"
)

func memoryAllocated() {
	data := make([]int, 10000000000)
	_ = data
}

func main() {
	f, err := os.Create("memory.prof")
	if err != nil {
		fmt.Println("unable to create file", f)
	}
	defer f.Close()
	runtime.GC()
	pprof.WriteHeapProfile(f)

}

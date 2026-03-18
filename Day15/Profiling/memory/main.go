package main

import (
	"fmt"
	"os"
	"runtime"
	"runtime/pprof"
)

func memoryAllocated() {
	data := make([]int, 1000000000000)
	_ = data
}
func main() {
	f, err := os.Create("mem.prof")
	if err != nil {
		fmt.Println("unable to crate file", f)
	}
	defer f.Close()
	runtime.GC()
	pprof.WriteHeapProfile(f)

}

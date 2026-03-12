package main

import "fmt"

type Registry struct {
	Stats map[string]int
}

func (r *Registry) Add(key string, val int) {
	r.Stats[key] = val
}

func (r *Registry) Remove(key string) {
	delete(r.Stats, key)
}

func main() {
	r := Registry{
		Stats: make(map[string]int),
	}

	r.Add("CPU", 80)
	r.Add("RAM", 40)
	r.Add("Disk", 90)

	val, ok := r.Stats["CPU"]
	if ok {
		fmt.Printf("CPU Usage: %d%%\n", val)
	}

	r.Remove("RAM")
	fmt.Println("Final Stats:", r.Stats)
	fmt.Println("Count:", len(r.Stats))
}

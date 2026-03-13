package main
import (
	"fmt"
	"sync"
)
func addWorker(id int,wg *sync.WaitGroup){
	defer wg.Done()

	fmt.Println("Worker Started",id)
	fmt.Println("Worker Ended",id)
}
func main(){
	
	var wg sync.WaitGroup
	for i:=range(5){
		wg.Add(1)
	go addWorker(i,&wg)
	}
	wg.Wait()
	fmt.Println("All Workers done there tasks")


}
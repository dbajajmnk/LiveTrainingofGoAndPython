package main
import "fmt"

func main(){
	nums :=[]int{6,7,8}

	for  _,num :=range nums{
		fmt.Println(num)
	}

	m :=map[string]string{"piyu":"sh","lname":"lname"}

	for k,v := range m{
        fmt.Println(k,v)
	}

	for i,c :=range "golanng"{
		fmt.Print(i,c)
	}
}
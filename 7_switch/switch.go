package main

import (
	"fmt"
	"time"
)

func main() {

	// i := 5
	// switch i {
	// case 1:
	// 	fmt.Print("one")
	
	// case 2:
	// 	fmt.Print("two")
	// }

	//multiple condition switch

	  switch time.Now().Weekday(){

	  case time.Friday:
         fmt.Println(" sannnevar")
	}


	whoami :=func (i interface{})  {
	    switch t :=i.(type) {
		case int:
			fmt.Print((t));
			
		}
	}

	whoami(1)


}
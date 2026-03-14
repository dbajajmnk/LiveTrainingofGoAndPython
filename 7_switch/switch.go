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

	dayNumber:=1

	switch dayNumber {
	case 1: fmt.Println("Sunday")
	case 2: fmt.Println("Monday")
	case 3: fmt.Println("Tuesday")
	case 4: fmt.Println("Wednesday")
	case 5: fmt.Println("Thursday")
	case 6: fmt.Println("Friday")
	case 7: fmt.Println("Saturday")
	default: fmt.Println("Sorry Wrong Input")


	}
	


}
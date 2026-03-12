// package main
// import "fmt"

// func Check_Age(age int) (string, error) {
// 	if age >= 18 && age<= 150{
// 		return "Ëligible", nil
// 	} else {
// 		return "Not eligible", fmt.Errorf("Not eligible voter")
// 	}
// }
// func main() {
// 	var age int
// 	fmt.Println("Enter the age of voter: ")
// 	fmt.Scan(&age)
// 	result, err := Check_Age(age)
// 	print(result, err)
// }

package main

import "fmt"

type SignupRequest struct {
	Name     string
	Email    string
	Password string
}

func validate(s SignupRequest) error {
	if s.Name == "" {
		return fmt.Errorf("name is required")
	}
	if s.Email == "" {
		return fmt.Errorf("email is required")
	}
	if s.Password == "" && len(s.Password)<8{
		return fmt.Errorf("password is required or is less in size")
	}
	return nil
}

func main() {
	req := SignupRequest{Name: "Alice", Email: "", Password: "secure123"}

	if err := validate(req); err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Validation successful!")
	}
}

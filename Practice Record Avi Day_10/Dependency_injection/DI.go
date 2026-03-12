package main

import "fmt"

type Notifier interface {
	send(msg string)
}

type emailServices struct{}

func (e emailServices) send(msg string) {
	fmt.Println("Email sent:", msg)
}

type SMSService struct{}

func (s SMSService) Send(msg string) {
	fmt.Println("SMS sent:", msg)
}

type UserService struct {
	notifier Notifier
}

func NewUserService(n Notifier) *UserService {
	return &UserService{
		notifier: n,
	}
}

func (u *UserService) RegisterUser(name string) {

	fmt.Println("User registered:", name)

	u.notifier.send("Welcome " + name)
}

func main() {
	// Choose notification implementation
	emailService := emailServices{}

	// Inject dependency
	userService := NewUserService(emailService)

	// Call business logic
	userService.RegisterUser("Avichal")
}

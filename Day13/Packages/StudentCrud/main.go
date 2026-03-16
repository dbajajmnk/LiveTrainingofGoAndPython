package main

import (
	"Studentmodule/cmd/config"
	"Studentmodule/internal/model"
	"Studentmodule/internal/route"
	"Studentmodule/internal/service"
	"Studentmodule/pkg/util"
	"fmt"
)

func main() {
	fmt.Println("Go Packages")
	config.Configuration()
	model.StudentStruct()
	route.StudentRoute()
	service.StudentService()
	util.Validation()

	//util.Validation()
	// userid := uuid.New()
	// fmt.Println("User Id:", userid)

}

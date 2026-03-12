package main

import "fmt"

type voterInfo interface {
	printCountry()
	printLanguage()
}
type Country struct {
	name        string
	area        float64
	popullation string
	language    string
}

type India struct {
	country Country
}

type Usa struct {
	country Country
}

// type Canada struct {
// 	country Country
// }

// type Bhutan struct {
// 	country Country
// }

// type Bangladesh struct {
// 	country Country
// }

// type Kenya struct {
// 	country Country
// }

type Nyzeria struct {
	country Country
}
func (india India) printCountry() {
	fmt.Println(india.country.name)

}
func (india India) printLanguage() {
	fmt.Println(india.country.language)

}
func (india Nyzeria) printCountry() {
	fmt.Println(india.country.name)
}
func (india Nyzeria) printLanguage() {
	fmt.Println(india.country.language)

}
func (india Usa) printCountry() {
	fmt.Println(india.country.name)

}
func (india Usa) printLanguage() {
	fmt.Println(india.country.language)

}
func votingMachine(info voterInfo) {
	info.printCountry()
	info.printLanguage()
}

func main() {
	country := Country{"India", 2333.54, "wast", "Hindi"}
	myindia := India{country}
	votingMachine(myindia)
	country2 := Country{"USA", 2333.54, "wast", "English"}
	myusa := Usa{country2}
	votingMachine(myusa)
	// nizeriaC3 := Country{"Nizera", 2333.54, "wast", "NiEnglish"}
	// ni := Nyzeria{nizeriaC3}
	// votingMachine()
}

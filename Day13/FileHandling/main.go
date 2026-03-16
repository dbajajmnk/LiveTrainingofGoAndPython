/*
*
Interface :
Discount
increment
decrement

# Total for method

# Product

*
*/
package main

import (
	"fmt"
	"os"
)

func main() {

	txtFile, err := os.Create("examples.txt")
	if err != nil {
		fmt.Println("Sorry unable to open file or Create File")
	} else {
		txtFile.WriteString("Hello Avichal Trim Question\n")
		defer txtFile.Close()
	}

}

func createTextFileAndWriteData(fileName string, extension string, data []string) (os.File, error) {
	txtFile, err := os.Create(fileName + extension)
	if err != nil {
		fmt.Println("Sorry unable to open file or Create File")
	} else {
		txtFile.WriteString(data[0])
		defer txtFile.Close()
	}
	return *txtFile, err
}

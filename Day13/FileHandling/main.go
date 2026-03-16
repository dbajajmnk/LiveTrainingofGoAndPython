/*
*
Interface :
Discount
increment
decrement
n("examples.txt")
# Total for method

# Product

*
*/
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {

	file, err := os.Open("data.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		fmt.Println(scanner.Text())
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
func readFile(fileName string) (string, error) {
	data, errReading := os.ReadFile(fileName)

	return string(data), errReading
}



func AppendData(fileName string, data string) (os.File, error) {
	txtfile, errReading := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY, 0664)

	if errReading != nil {
		return *txtfile, errReading
	}
	txtfile.WriteString(data)
	defer txtfile.Close()

	return *txtfile, nil
}

func DeleteFile(fileName string) (string, error) {
	errReading := os.Remove(fileName)

	if errReading != nil {
		return "Something went wrong", errReading
	}

	return "File Deleted Successfully", nil
}

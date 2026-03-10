package main

import "fmt"

func main() {
	//unititialized
	var nums []int
	fmt.Println((nums))

	var num =make([]int,2,5)

	 fmt.Print(num)
	 fmt.Print(cap(num))
	 nums =append(nums, 1)

	 //copy function
	 var nums2=make([]int, len(nums))

	 copy(nums2,num)


	 var arr=[]int{1,2,3}
	 fmt.Print(arr[0:2])

}
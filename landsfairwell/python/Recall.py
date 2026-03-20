#variables
#Control Flow
##Function

def findGreaterNumber(a,b):
	if a>b:
		return a
	else:
		return b
	

def getMonthNameByNumber(a):
	match a:
		case 1:
			return "January"
		case 2:
			return "Feb"
		case 3:
			return "March"
		case _:
			return "Sorry Invalid Number"

def LoopingTest():
	i=0
	while i<10:
		print(i)
		i=i+1
		
	
def main():
    print("Hello World")
    greaterNumber = findGreaterNumber(10,15)
    print(greaterNumber)
    LoopingTest()
    getMonthNameByNumber(1)


if __name__ == "__main__":
    main()





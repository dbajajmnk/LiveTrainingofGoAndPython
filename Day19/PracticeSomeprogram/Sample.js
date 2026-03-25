const isNumberEven = (number)=>{
    print(number%2==0?"Number is Even" : "Number is Odd");
}

findGreaterNumber(110,90,30);
findGreaterNumberWithTernary(110,990,1030);
// findGreaterNumberWithTernary(110,90);
function findGreaterNumber(a,b,c){
    if(a>b){
        if(a>c){
            print("A is Greater",a);
        }
        else
        {
            print("C is Greater",c);
        }
        
    }
    else {
            if(b>c){
            print("B is Greater",b);
        }
        else
        {
            print("C is Greater",c);
        }
        }
}
isNumberEven(11);

swapTwoNumber=(a,b)=>{
    print("Before Swapping",a,b)
    var c=a;
    a=b;
    b=c;
    print("After Swapping",a,b)
    
}
swapTwoNumberWithoutThirdVariable=(a,b)=>{
    print("Before Swapping",a,b)
    a+=b;
    b=a-b;
    a-=b;
    print("After Swapping",a,b)
    
}
swapTwoNumber(10,220);
swapTwoNumberWithoutThirdVariable(550,1050);

// function findGreaterNumberWithTernary(a,b){
//     a>b?print("A is Grater",a):print("B is Greater",b)
// }

function findGreaterNumberWithTernary(a,b,c){
    a>b?a>c ?print("A is Grater",a):print("C is Greater,C"):b>c ?
    print("B is Greater",b):print("C is Grater",c);
}
sunOfArgument(10,20,23,45);

function sunOfArgument(...a){
    sum =0;
    a.forEach((value)=> sum+=value);
    print("Sum",sum);
}

printATableofNumber=(number)=>{
    for(let i=1;i<=10;i++){
        print(`${number}*${i}=${number*i}`);
    }
}
printTheTableOfN=(n)=>{
    for (let i=1;i<=n;i++){
        print("Table of ",i)
        printATableofNumber(i);
        print("Table End ",i);
    }
    
}
printTheTableOfN(10);

function print(...a){
    console.log(a)
}
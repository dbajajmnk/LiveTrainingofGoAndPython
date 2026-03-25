print=(...a)=>{
    console.log(a)
}
sunOfArgument=(...a)=>{
    sum =0;
    a.forEach((value)=> sum+=value);
    print("Sum",sum);
}

const isNumberEven = (number)=>{
    print(number%2==0?"Number is Even" : "Number is Odd");
}


// findGreaterNumberWithTernary(110,90);
findGreaterNumber=(a,b,c)=>{
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

findGreaterNumberWithTernary=(a,b,c)=>{
    a>b?a>c ?print("A is Grater",a):print("C is Greater,C"):b>c ?
    print("B is Greater",b):print("C is Grater",c);
}
sunOfArgument(10,20,23,45);


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


findGreaterNumber(110,90,30);
findGreaterNumberWithTernary(110,990,1030);

//Arrow funciton
sum=(a,b)=>a+b
squareroot=a=>a*a
print(squareroot(10));

printStarPattern=(n)=>{
    for(i=1;i<=n;i++)
    {
        row="";
        for(j=0;j<i;j++)
        {
            row+="*"
            
        }
        console.log(row);
        
    }
}
printStarPattern(10);
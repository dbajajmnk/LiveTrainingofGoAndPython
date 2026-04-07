//Factory Design Pattern
//For Creation of object
function user(name,email,phone,password,age,address){
    return {
        name:name,
        email:email,
        phone:phone,
        password:password,
        age:age,
        address:address
    }
}

//For creation of object based on type
function userByType(name,email,phone,password,age,address,type){

    switch(type){
        case "emp": return {name:name,email:email};
        case "trainer": return {name:name,email:email,age:age};
        case "student":return {name:name,email:email,age:age,address:address};
        default : return {name:name,email:email,age:age,phone:phone,address:address};

    }

    
}
/////////////////////////Constructer////////////////////////////////
// function User(name,email,phone,password,age,address){
    
//         this.name=name;
//         this.email=email;
//         this.phone=phone;
//         this.password=password;
//         this.age=age;
//         this.address=address;
    
// }
class  User{
    
        constructor(name,email,phone,password,age,address){
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.password=password;
        this.age=age;
        this.address=address;
        }
    
}
const avichal = user("Avichal","avichal@gmail.com","7383838838838",
    "123",20,"Banglore");
const anuj = user("Anuj","Anuj@gmail.com","7383838838838",
    "123",20,"Banglore");
console.log(avichal);
console.log(anuj);
const avichal1 = new User("Avichal","avichal@gmail.com","7383838838838",
    "123",20,"Banglore");
const anuj1 = new User("Anuj","Anuj@gmail.com","7383838838838",
    "123",20,"Banglore");
console.log(avichal1);
console.log(anuj1);

const emp = userByType("Avichal","avichal@gmail.com","7383838838838",
    "123",20,"Banglore","emp");
const trainer = userByType("Anuj","Anuj@gmail.com","7383838838838",
    "123",20,"Banglore","trainer");
const student = userByType("Anuj","Anuj@gmail.com","7383838838838",
    "123",20,"Banglore","trainer");
const ansari = userByType("Anuj","Anuj@gmail.com","7383838838838",
    "123",20,"Banglore","trainer");

console.log(emp);
console.log(trainer);
console.log(student);
console.log(ansari);
/////////////////////////////////////// Singleton //////////////////////////////////////
const appConfig= (function(){
    let instance;
    function createInstance()
    {
        return {
            name:"Deepak",
            role:"Trainer"

        }
    }

    return function getInstance(){
        if(!instance){
            console.log("new createion need")
            instance = createInstance();
        }
        else{console.log("No Need to new Instance Already Exist")}

        return instance;
    }
})()

appConfig();
appConfig();
/******************************* Module *******************************/
const counter= (function(){
    let counter=0;
    function increment()
    {
       counter++;
    }

    function decrement(){
       counter--;
    }
    function getCount(){
        return counter;
    }

    return {increment,
        decrement,
        getCount
    }
})()
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());


/******************************* Decorator ***************************/

/******************************* Observer ***************************/
class Subject {
    constructor(){
        this.observers= [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unSubscribe(removeObserver){
        this.observers = observers.filter((observer)=> observer!=removeObserver)
    }
    notify(data){
        this.observers.forEach(element => {
            element(data);
        });
    }
}
let newSubject = new Subject();

function subscriber(news){
    console.log("Subscriber",news);
}
function subscriber2(news){
    console.log("Subscriber2",news);
}
newSubject.subscribe(subscriber)
newSubject.subscribe(subscriber2)
newSubject.notify("Hello guys you are awesome");


/******************************* Facade ****************************/
const orderPlacement= {
        oderRecieved(){
            console.log("Order Recieved");
        },
        orderPaymentDone(){
            console.log("Order Payment Done");
        },
        orderPacked(){
            console.log("Order Packaged")
        },
        orderDispactched(){
            console.log("Order Dispatched for Delivery");

        },
        orderDelivered(){
            console.log("Order Delivered")
        }


}
function processOrder(){
    orderPlacement.oderRecieved();
    orderPlacement.orderPaymentDone();
    orderPlacement.orderPacked();
    orderPlacement.orderDispactched();
    orderPlacement.orderDelivered();
}
processOrder();

/******************************* Stratedgy ************************/
const payment = {
    upi(amount){
        console.log("Payment Done by UPI",amount);
    },
    netBanking(amount){
        console.log("Payment Done by NetBanking",amount);
    },
    card(amount){
        console.log("Payment Done by Card",amount);
    }
}
payment.upi(200);
payment.netBanking(1000);
payment.card(5000);

/******************************* Adapter   ************************/
function  oldUser(name) {

    return {
        name:name,
        getUserName:function(){
            return this.name;
        }
    }
        
}
function newUser(oldUser){
    return {
        getName:function(){
            return oldUser.getUserName();
        }
    }
}

const oldUser1 = oldUser("Avichal");
const newUser1 = newUser(oldUser1);
console.log(newUser1.getName());
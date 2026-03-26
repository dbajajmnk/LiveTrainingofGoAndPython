function shoppingCart(){
    let items =[];
    return {
        addItem(item){
            items.push(item);
        },
        removeItem(item){
            items=items.filter((value)=>value.name!==item.name);
        },
        getItems(){
            return [...items];
        },
        getTotal(){
            return items.reduce((sum,value)=>sum+value.price,0)
        }
    }
}
const myShoppingCart = shoppingCart();
myShoppingCart.addItem({name:"Addias Shoe",price:100})
myShoppingCart.addItem({name:"T-Shirt",price:200})
myShoppingCart.addItem({name:"Belt",price:1000})
myShoppingCart.addItem({name:"Bat",price:500})
myShoppingCart.removeItem({name:"Addias Shoe"})
console.log(myShoppingCart.getItems());
console.log(myShoppingCart.getTotal())
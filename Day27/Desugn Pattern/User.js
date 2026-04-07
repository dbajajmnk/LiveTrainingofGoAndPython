class User{
    constructor (name, email, phone, password, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.age = age;
        this.address = address;
    }
}

const avichal = new User("Avichal", "avichal@gmail.com", "7383838838838",
"123", 20, "Banglore");
const anuj = new User("Anuj", "Anuj@gmail.com", "7383838838838",
"123", 20, "Banglore");
console.log(avichal);
console.log(anuj);
const avichal1 = new User("Avichal", "avichal@gmail.com", "7383838838838",
"132", 30, "Banglore");
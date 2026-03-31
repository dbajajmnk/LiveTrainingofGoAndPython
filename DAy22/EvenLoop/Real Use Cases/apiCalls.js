
function createUser(name, email, age, password, phone) {
    return { name, email, age, password, phone };
}

let users = [
    createUser("Deepak", "deepakbajaj79@gmail.com", 10, "123", "9322333333333"),
    createUser("Avichal", "avichal@gmail.com", 25, "456", "9322333333334"),
    createUser("Rahul", "rahul@gmail.com", 30, "789", "9322333333335"),
    createUser("Priya", "priya@gmail.com", 28, "012", "9322333333336")
];

async function login(user) {
   
    if (user.name === "Deepak" && user.password === "123") {
        return user; 
    } else {
        throw new Error("Invalid Login Credential");
    }
}

async function displayUser(user) {
    return users.filter((u) => u.name === user.name);
}


async function loginAndDisplayUser(user) {
    try {
        let loggedInUser = await login(user);
        let userDetails = await displayUser(loggedInUser);
        console.log("User Details Found:", userDetails);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

loginAndDisplayUser({ name: "Deepak", password: "123" });

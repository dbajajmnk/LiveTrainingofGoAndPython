function deleteUser(id) {
    console.log("User Deleted with Id", id);
}

function create(user) {
    console.log("User Created", user);
}

function read() {
    console.log("User read");
}

function update(id, data) {
    console.log(`User ${id} Updated with`, data);
}

function authnication(user, fn, ...arg) {
    if (user.role === "Admin") {
        return fn(...arg);
    }

    if (user.role === "Manager") {
        if (fn === read || fn === update || fn === deleteUser) {
            return fn(...arg);
        }
    }

    if (user.role === "Editor") {
        if (fn === read || fn === update) {
            return fn(...arg);
        }
    }

    console.log("Access Denied");
}

// Example usage:
const myUser = { name: "Deepak", role: "Manager" };
authnication(myUser, update, 101, { name: "kkkke" });

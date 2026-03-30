const express = require("express");

const app = express();

function logger(req, res, next) {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Time:", new Date().toISOString());
    console.log("----------------------");
    next();
}

app.use(logger);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
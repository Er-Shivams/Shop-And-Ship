const express = require("express");

const app = express();



const port = 8000;

app.get("/", (req, res) => {
    return res.send("<h1>Hello shivam this is your Homepage<h1>");
})
app.get("/login", (req, res) => {
    return res.send("<h1>welcome to login pages<h1>");
})

app.get("/signup", (req, res) => {
    return res.send("<h1>welcome to signup page<h1>");
})
app.get("/shivam", (req, res) => {
    return res.send("<h1>welcome to shivam instagram page<h1>");
})





app.listen(port, () => {
   console.log("Our server is running on port 8000...");
});
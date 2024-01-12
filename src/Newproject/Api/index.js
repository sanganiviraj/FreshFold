const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const routerauth = require("./routers/auth");
const app = express();
const ports =  3000;
const cors = require("cors");
app.use(cors());

app.use(bodyparser.urlencoded({extends:false}));
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://logicwave36:logicwave123@cluster0.fgh5f5l.mongodb.net/").then(() => {
    console.log("connectin successful");
}).catch((er) => {
    console.log(er);
})

app.get("/notes",(req,res) => {
    res.send("send note successfull");
})

app.use("/api/router",routerauth)

app.listen(ports , () => {
    console.log("server is running on port 3000");
})
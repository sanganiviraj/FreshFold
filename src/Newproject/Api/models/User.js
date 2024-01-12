const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name:{
        type:String,
        min:5,
        max:30,
    },
    email:{
        type:String,
        min:5,
        max:30,
        unique:true,
        required : true
    },
    password:{
        type:String,
        min:5,
        max:30,
        required : true
    }
},{timestamps:true})

module.exports = mongoose.model("user", user);
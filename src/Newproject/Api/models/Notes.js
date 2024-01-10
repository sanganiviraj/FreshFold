const mongoose = require("mongoose");

const notes = new mongoose.Schema({
    title:{
        type:String,
        min:5,
        max:30,
        required:true   
    },
    description:{
        type:String,
        min:20,
        max:300,
        required : true
    },
    
},{timestamps:true})

module.exports = mongoose.model("notes", notes);
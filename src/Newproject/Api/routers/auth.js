const router = require("express").Router();
const user = require("../models/User");

router.get("/login" ,async(req,res) => {
    try{

        const users = await user.findOne({email: req.body.email});
        !users && res.status(400).json({message:"user not found" , status: false});

        const validpass = req.body.password == user.password;
        !validpass && res.status(400).json({message:"password is wrong" , status: false});

        res.status(200).json(users)
    }catch(e){      
        res.status(500).json(e)
    }
})

router.post("/register" , async (req,res) => {  
    try{
        const users = new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })

        const data = await users.save()

        res.status(200).json(data);

    }catch(e){
        res.status(300).json(e);
    }
})

router.get("/getdata/:userId" , async (req,res) => {  
    try{
        const currentuser = await user.findById(req.params.userId);
        !currentuser && res.status(400).json({ data : "user not found"});

        res.status(200).json(currentuser);

    }catch(e){
        res.status(300).json(e);
    }
})

module.exports = router 
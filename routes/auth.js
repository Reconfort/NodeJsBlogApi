const express = require('express')
const router = express.Router();
const User =  require("../models/User")
const bcrypt = require('bcrypt')

// Register 
router.post("/register",async (req, res) =>{
    



    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        
        const savedUser = await newUser.save();

        res.sendStatus(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }




    // try {
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPass = await bcrypt.hash(req.body.password, salt)

    //     const newuser= await User.create({
    //         username:req.body.username,
    //         email:req.body.email,
    //         password:hashedPass
    //     })
    //     res.status(200).json({data:newuser});
    // } catch (error) {
    //     res.status(500).json(error);
    //     console.log(error);
    // }
})


    // Login
    router.post("/login", async(req,res) =>{
        try{
            const user = await User.findOne({username: req.body.username})
            !user && res.status(400).json("Wrong credentials")

            const validated = await bcrypt.compare(req.body.password, user.password)
            !validated && res.status(400).json("Wrong credentials")

            const {password, ...others} = user._doc;
            res.status(200).json(others)
            // res.status(200).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
     })
module.exports = router 
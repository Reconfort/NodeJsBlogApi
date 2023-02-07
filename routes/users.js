const express = require('express')
const router = express.Router();
const User =  require("../models/User")
const Post =  require("../models/Post")
const bcrypt = require('bcrypt')

// Update
router.put("/:id",async (req, res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{
                new: true
            })
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }
    else{
        res.status(401).json("You can only update your account")
    }
})


    // Delete
    router.delete("/:id", async (req, res) =>{
        try {
                if(req.body.userId === req.params.id){

                
            //     const user = await User.findByIdAndDelete(req.params.id);
            //     if(!user)  return   res.status(404).json({
            //         message:"user not found",
            //     })
              
            // return    res.status(204).json({
            //         message:"User deleted successfully"
            //     })
                // try {
                    const user  =   await User.findByIdAndDelete(req.params.id)
                    if(!user ) return res.status(404).json("User not found 🚫");
                    await Post.deleteMany({username : user.username})
     res.status(200).json(`user deleted 🗑`)         
                     // }
            }
                else{
                  return  res.status(400).json("You can only delete your Account 🚫")
                }
            } catch (error) {
               return res.status(404).json(error)
            }
      
    })

    //GET USER
    router.get("/:id", async (req,res) =>{
        try {
            const user = await User.findById(req.params.id);
            const {password , ...others} = user._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
    })
    
    
module.exports = router 
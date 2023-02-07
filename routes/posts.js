const express = require('express');
const { createIndexes } = require('../models/Post');
const router = express.Router();
// const User =  require("../models/User")
const Post =  require("../models/Post")
// const bcrypt = require('bcrypt')


// CREATE POST 
router.post("/", async(req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.sendStatus(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update post
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const updatedPost =  await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{
                    new:true
                })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else{
            res.status(401).json("You can only update your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete post
router.delete("/:id", async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.delete();
                res.status(200).json("Post deleted ... 🗑")
            } catch (error) {
                res.status(401).json(error)
            }
        }
        else{
            res.status(401).json("You can only delete your post!")
        }
    } catch(err){
        res.status(500).json(err)
    }
})



//Get one user
router.get("/:id", async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(401).json(error)
    }
})

// Get all post 
router.get("/", async(req,res) =>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if(catName){
            posts =  await Post.find({categories:{
                $in:[catName]
            }})
        }
        else{
            posts = await Post.find()
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(401).json(error)
    }
})
   
    
module.exports = router 
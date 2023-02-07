const express = require("express")
const router = express.Router();
const Category = require('../models/Category');

// ADD CATEGORY 
router.post("/", async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error)
    }
})
// GET ALL CATEGORY 
router.get("/", async(req, res) =>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
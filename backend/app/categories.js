const express = require("express");
const Category = require("../models/CategoryScheme");
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const data = await Category.find();
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

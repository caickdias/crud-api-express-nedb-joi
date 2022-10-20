const express = require('express');
const { postSchema } = require('../schemas/User');
const db = require('../database/db');

const router = express.Router();

router.post('/login', async (req, res, next) => {
            
    const fakeUser = {
        user: 'caick',
        password: 'admin',
        role: 'admin',
    }

    const { user, password } = req.body;
    try{
        if(user != fakeUser.user || password != fakeUser.password){
            throw new Error("Invalid user or password");
        }
        res.send({
            "success": true,
        })
    } catch(err){
        next(err)
    }


});
module.exports = router;

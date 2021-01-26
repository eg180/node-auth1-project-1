const express = require("express");
const User = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body
    // save the username & pw
    const hashed = bcrypt.hashSync(password, 10) // 2 ^ 10

    User.add({ username, password: hashed})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })

})

router.post('/login', async (req, res) => {
    // res.json('silly login')
    const { username, password } = req.body
    // if(req.session && req.session.user) 
    try {
        // 1- we pull the user from the db by that username
        const allegedUser = await User.findBy({ username }).first()
        // 2- we compare their db has against the pw in req
        if (allegedUser && bcrypt.compareSync(password, allegedUser.password)) {
            // save a session with this particular user
            req.session.user = allegedUser // magic here changing session if stored
            res.json('welcome back')

        } else {
            res.status(401).json('invalid credentials')
        }

    } catch (err) {
        res.status(500).json(err.message)

    }
});


router.get('/logout', (req, res) => {
    res.json('silly logout')

    
})







module.exports = router;
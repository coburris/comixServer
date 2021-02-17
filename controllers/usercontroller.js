const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', function(req,res){
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 13)
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'Time to Save the World!',
                token: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err}))
});

router.post('/login', function(req,res){

    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, matches){
                if (matches) {

                    let token = jwt.sign({ id: user.id,}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                    res.status(200).json({
                        user: user,
                        message: "Welcome Back to the BatCave!",
                        token: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            });
        } else {
            res.status(500).json({ error: "Batman doesn't have records of that superhero."})
        }
    })
    .catch(err => res.status(500).json({ error : err}))
})

module.exports = router
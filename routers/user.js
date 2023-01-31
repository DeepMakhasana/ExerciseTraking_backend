const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// only for testing
// router.get('/', (req,res) => {
//     res.send("<h1>Welcome to Exercise taking site </h1>");
// })


// Show all users
router.route('/').get((req, res) => {
    User.find()
        .then((data) => {
            res.json(data)
        }).catch((err) => res.status(400).json('Error' + err));
})


// show user as per id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            res.json(data)
        }).catch((err) => { res.status(400).json(err) });
})

// Add user in database
router.route('/registration').post((req, res) => {
    const { username, email, password, cpassword } = req.body;

    const newUser = new User({ username, email, password, cpassword });

    User.count({ email: email }, (err, result) => {
        if (!result) {
            newUser.save()
                .then(() => res.send({ msg: "Register Successfully!" }))
                .catch((err) => res.send({ msg: `Error: ${err}` }));
        } else {
            res.send({ msg: 'Email is already exist!' });
        }
    })
})

// login
router.route('/login').post((req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, result) => {
        if (result) {
            if (result.password === password) {
                res.send({msg: "Login Successfully!", user: result})
            } else {
                res.send({msg: "Password wrong..."})
            }
        } else {
            res.send({msg: "You are not register first registration..."})
        }
    })



})


// Update user as per id in database
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            data.username = req.body.username;

            data.save()
                .then(() => { res.json('Update successfully!') })
                .catch((err) => { res.json('Error: ' + err) })
        })
        .catch(err => res.json(err));
})

// Delete user as per id in the database
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => { res.json('Delete Successfully.') })
        .catch((err) => { res.json('Error: ' + err) })
})

module.exports = router;
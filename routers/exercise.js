const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');


// show exercise as per id
router.route('/:id').get((req, res) => {
    Exercise.find({user_id: req.params.id}).sort({updatedAt:-1})
    .then((data) => { res.json(data) })
    .catch(err => res.status(400).json(err));
})

// add exercise
router.route('/add').post((req,res) => {
    const {username, description, duration, date, user_id} = req.body;

    const newExercise = new Exercise({username, description, duration, date, user_id});

    newExercise.save()
    .then(() => res.json('Exercise add successfully!'))
    .catch(err => res.json(err));
})

// show all exercise
router.route('/update/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then((data) => { res.json(data) })
    .catch(err => res.status(400).json(err));
})

// Update exercise
router.route('/update/:id').post((req,res) => {
    const {username, description, duration, date} = req.body;

    Exercise.findById(req.params.id)
    .then((data) => {
        data.username = username;
        data.description = description;
        data.duration = duration;
        data.date = date;

        data.save()
        .then(() => res.json('Exercise add successfully!'))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
})

// delete exercise
router.route('/delete/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Delete successfully!'))
    .catch(err => res.json(err));
})


module.exports = router;

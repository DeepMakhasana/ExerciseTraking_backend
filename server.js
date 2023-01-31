const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use router
const userRouter = require('./routers/user');
const ExerciseRouter = require('./routers/exercise');
app.use('/user', userRouter);
app.use('/exercise', ExerciseRouter);


// env
dotenv.config({path: './.env'});
const port = process.env.PORT || 5000;
const url = process.env.ATLAS_URL;



// Database connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connection successfully.'))
.catch((error) => console.log(error));



app.listen(port, ()=>{
    console.log(`Server start on http://localhost:${port}`);
})
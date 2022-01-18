// MAIN BACKEND FILE
const MoviesModel=require("./Database/movies");
const UserModel=require("./Database/users");
require('dotenv').config();
// const db = require("./Database");
const express = require("express");
var cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json());



//Import the mongoose module
var mongoose = require('mongoose'); 
//Set up default mongoose connection
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));



// http://localhost:5000/
app.get("/", (req, res) => {
    return res.json({ "WELCOME": `to my Backend Software for the BookMyShow` });
});


/*Route             /movies
Description       Get all movies
Access            public 
Parameter         None 
Methods           get
*/
// http://localhost:5000/Movies 
app.get("/Movies",async (req, res) => {
    const getAllMovies =await MoviesModel.find();
    return res.json(getAllMovies);
});



/*Route             /movies
Description       Get Single movie
Access            public 
Parameter         None 
Methods           get
*/
// http://localhost:5000/Movies/:id
app.get("/Movies/:id",async (req, res) => {
    const {id}=req.params;
    const getMovie =await MoviesModel.findOne({_id:id});
    return res.json(getMovie);
});

/*
Route            /user-register
Description      Post sinlge user details in users collection
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
// http://localhost:5000/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json( {userAdded: addNewUser, message: "User was added !!!"} );
});


app.listen(5000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});
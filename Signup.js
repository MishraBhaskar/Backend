// Connecting Express to Mongo 

const  express = require('express');
const mongoose  = require('mongoose');
const bodyparser = require('body-parser');
const { error } = require('console');
const { type } = require('os');



// Staring the express application
const app = express();

// Middleware to parse incoming JSON
 app.use(bodyparser.json());

 // Mongoose connecting string

 const mongoURI = "mongodb://localhost:27017/CRM";
 mongoose.connect(mongoURI)
 .then(() =>
console.log("MongoDB connect Succefully .!")
)
.catch(error =>console.log(error))

const port = process.env.PORT || 8000;

// Creating new Schema 

const UserSchema = new mongoose.Schema(
    {
        Email:{
            type: String,
            required: true,
            unique:true
        },
        Password:{
            type:String,
            require:true
        },
        Username:{
            type:String,
            require:true
        }

    }

);

// Creating User Model

const User = mongoose.model('User',UserSchema);

// Post Api to create a new User
app.post('/api/user',async(req,res)=>
{
try{
    const {Email,Password,Username} = req.body;
    // chack the Missing Field
    if(!Email || !Password || !Username)
    {
        return res.status(400).json({ message : "Please fill in all fields" });

    }
    // Creating New User 

    const newUser = new User(
        {
            Email,
            Password,
            Username

        }
    );
    await newUser.save();
    res.status(201).json({ message: 'User Save Successfully'});
}
catch(error)
{
    console.log(error);
    res.status(500).json({ message :"Error Creating Student "});
}
})




app.listen(port,() =>
{
    console.log(`server Run at Port ${port}`);
}
)

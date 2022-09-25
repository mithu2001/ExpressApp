const express = require("express");
const app = express();
const mongoose = require("mongoose");
//middleware function -> to convert frontend data into json
app.use(express.json());
app.listen(8000);
let users = [
    {
        'id':1,
        'Name':"Jeebachh"
    },
    {
        'id':2,
        'Name':"Mithu"
    },
    {
        'id':3,
        'Name':"Ranjit"
    }
];

//Router 
const userRouter = express.Router();
const authRouter = express.Router();
app.use('/users',userRouter);//base route , router to use
app.use('/auth',authRouter);//base route , router to use

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:username')
.get(getUserByName)

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp);

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-me", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//Get  user
app.get("/users", (req, res) => {
  res.send(users);
});






function getUser(req,res){
  console.log(req.query);
  res.send(users);
}
function postUser(req, res)  {
  
  console.log(req.body);
  users = req.body; //it sends data into a users variable
  res.json({
    message: "Data Recieved Successfully",
    user: req.body,
  });
  res.end();
}

function updateUser(req,res){
  console.log("req->body",req.body);
//update data in users object
let dataToBeUpdated= req.body;
for(key in dataToBeUpdated){
  users[key]= dataToBeUpdated[key];
}

  res.json({
      message: "Data Updated Successfully"
    });
}

function deleteUser(req,res){
  users = {};
  res.json({
     message:"Data deleted Successfully"
  })
}

function getUserByName(req,res){
  console.log(req.params.username);
  console.log(req.params);

  res.send("users name recieved");
  
 



}

function getSignUp(req, res){
     res.sendFile('./public/index.html',{ root: __dirname });
}

function postSignUp(req,res){
     let dataObj= req.body;
     res.json({
      message:"user signed up",
      data:dataObj

     });
}

//database link comes from mongodb atlas
const db_link='mongodb+srv://guptatechnology:anjali_291102@cluster0.rzk9ls9.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log("DB is Connected");
})
.catch(function(err){
  console.log(err);
});

//Schema
const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minLength:8,
  },
  confirmPassword:{
    type:String,
    required:true,
    minLength:8,
  }
});

//models
const userModel = mongoose.model('userModel',userSchema);
(async function createUser(){
  let user = {
    name:'Mithu',
    email:'jaishreeKrishna@gmail.com',
    password:'123456789',
    confirmPassword:'123456789'
  };
  let data =await userModel.create(user);
  console.log(data);
}());



//404 page
app.use((req, res) => {
  res.sendFile("./views/404.html", { root: __dirname });
});

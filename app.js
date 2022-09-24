const express = require("express");
const app = express();

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

app.get('/users',getUser)

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

//post request
app.post("/users", postUser);


//Update - > patch

app.patch("/users",updateUser);


//delete data
app.delete('/users',deleteUser);

//params
app.get('/users/:username',(req,res)=>{
    console.log(req.params.username);
    console.log(req.params);
  res.send("users name recieved");
  
})


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



//404 page
app.use((req, res) => {
  res.sendFile("./views/404.html", { root: __dirname });
});

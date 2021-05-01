const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

// app_user
// tpsappassword

mongodbUri = "mongodb+srv://app_user:tpsappassword@tpsapcluster.ivxco.mongodb.net/tpsap?retryWrites=true&w=majority"

const dealer = express();
const port = 8080
const root = { root: __dirname }
const path = require('path')

console.log("Starting Backend Server!!");
mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDb connected");
})


const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('UserLoginDetails', userSchema);

var RecievedUsersData = new Array;

User.find({},(error, data) => {
  if(error){
    console.log(error);
  }else {
    RecievedUsersData = data;
  }
});

dealer.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
})

dealer.use(bodyparser.text())


// LOGIN FUNCTIONS
dealer.get('/login/**', (req,res) => {
})

dealer.post('/login/**', (req, res) => {
  loginRequest = JSON.parse(req.body)
  User.findOne(loginRequest,(error, data) => {
    if(error){
      console.log(error);
    }else {
      console.log(data);
      if( data != null){
        res.send("OK");
        res.status(200).end()
      }else {
        res.send("NOT OK")
        res.status(200).end()
      }
    }
  });
})

// ADMIN FUNCTIONS

// - get users
dealer.get('/adminfunctions', (req, res) => {

  console.log("Someone requested the users list!");

  // DB QUERY

  Userlist = User.find({},(error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
      res.status(200).end();
    }
  })
})

// - modify user

dealer.get('/adminfunctions/modify/:usernameb64-:passwordb64', (req, res) => {
  
  var SelectedUser = Buffer.from(req.params.usernameb64, 'base64').toString();

  var newPassword = Buffer.from(req.params.passwordb64, 'base64').toString();

  console.log("Someone wants to modify the user " + UserToModify + " To ");

  res.send("Modifying " + SelectedUser);
  res.status(200).end();

})


// - delete user

dealer.get('/adminfunctions/delete/:usernameb64', (req, res) => {

  var SelectedUser = Buffer.from(req.params.usernameb64, 'base64').toString();

  console.log("Someone wants to delete the user " + SelectedUser);

  // DB QUERY

  User.deleteOne({ username: SelectedUser }, (error, data) => {
    if (error) {
  
      console.log(error);
  
      res.send("Deleting " + SelectedUser);
      res.status(200).end();

    } else {
      res.send("Deleting " + SelectedUser);
      res.status(200).end();
    }
  })

})

// - add user

dealer.get('/adminfunctions/add/:usernameb64-:passwordb64', (req, res) => {

  var SelectedUser = Buffer.from(req.params.usernameb64, 'base64').toString();

  var SelectedPassword = Buffer.from(req.params.passwordb64, 'base64').toString();

  console.log("Someone wants to add the user '" + SelectedUser + "' with password '" + SelectedPassword + "'");

  // DB QUERY
  
  var newUser = new User({
    username: SelectedUser,
    password: SelectedPassword
  })

  newUser.save((error, data) => {
    if (error) {
      console.log(error);

      res.send("Adding '" + SelectedUser + "' with password '" + SelectedPassword + "'");
      res.status(200).end();
    
    } else {
    
      res.send("Adding '" + SelectedUser + "' with password '" + SelectedPassword + "'");
      res.status(200).end();
    }
  })
})




//QUERY FUNCTIONS

dealer.get('/queryprocessor/:queryslug',(req, res) => {
  console.log("Someone sent a query!");

  var decodedquery = Buffer.from(req.params.queryslug, 'base64').toString()

  console.log(decodedquery);
  
  res.send("got it!");
  res.status(200).end();

})


// SERVER 

dealer.listen(port, () => {
  console.log(`API Started at http://localhost:${port}`)
})

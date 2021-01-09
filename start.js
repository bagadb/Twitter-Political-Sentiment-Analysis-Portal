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

function searchForLoginData(UserLoginDetails){
  
}

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

dealer.get('/login/**', (req,res) => {
})

dealer.post('/login/**', (req, res) => {
  loginRequest = JSON.parse(req.body)
  //console.log(loginRequest);
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

dealer.listen(port, () => {
  console.log(`API Started at http://localhost:${port}`)
})

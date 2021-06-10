const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const { exec } = require("child_process");
var fs = require('fs');

// app_user
// tpsappassword

mongodbUri = "mongodb+srv://app_user:tpsappassword@tpsapcluster.ivxco.mongodb.net/tpsap?retryWrites=true&w=majority"

const dealer = express();
const port = 8080
const root = { root: __dirname }
const path = require('path');
const { json } = require("body-parser");

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

    } else {
    
      res.send("Adding '" + SelectedUser + "' with password '" + SelectedPassword + "'");
      res.status(200).end();
    }
  })
})




//QUERY FUNCTIONS

dealer.get('/queryprocessor/:queryslug',(req, res) => {
  console.log("Someone sent a query!");
 
  var queryString = Buffer.from(req.params.queryslug, 'base64').toString();
  
  var queryObject = JSON.parse(queryString);

  var numberOfTweets = queryObject.queryAmount;

  var typeOfQuery = queryObject.queryType;

  var stringOfQuery = queryObject.queryString;

  var excludeRetweets = 0;

  if( queryObject.queryXRT == true ){
    var excludeRetweets = 1;
  }else{
    var excludeRetweets = 0;
  }

  querytypeDict = {
    "keyword" : 0,
    "hashtag" : 1,
    "username": 2
  }

  console.log("Executing n:" + numberOfTweets + " t:" + querytypeDict[typeOfQuery] + " s:" + stringOfQuery
  + " RT:" + excludeRetweets) ;

  scriptArguments = numberOfTweets + " " + querytypeDict[typeOfQuery] + " " + stringOfQuery + " " + excludeRetweets;
  
  exec("python3 ./python-scripts/scraping.py " + scriptArguments, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }   
    let rawdata = fs.readFileSync('jsondata/tweets.json');
  
    let downloadedTweets = JSON.parse(rawdata);

    tweets = JSON.stringify(downloadedTweets);

    res.send(tweets);
    res.end(200);

  })
})

dealer.get('/sentimentscores',(req,res)=>{

  exec("python3 ./python-scripts/sentiment.py", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);

    let rawdata = fs.readFileSync('jsondata/sentimentscores.json');
    
    let sentimentscores = JSON.parse(rawdata);
  
    res.send(JSON.stringify(sentimentscores));
    
    res.end(200);
  })

})

dealer.get('/visualization/aggregation',(req,res)=>{
  exec("python3 ./python-scripts/aggregation.py", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);

    let rawdata = fs.readFileSync('jsondata/aggregation.json');
    
    let aggregationData = JSON.parse(rawdata);
  
    res.send(JSON.stringify(aggregationData));
    
    res.end(200);
  })
})


dealer.get('/visualization/piechart',(req,res)=>{

    let rawdata = fs.readFileSync('jsondata/polnonpol.json');
    
    let aggregationData = JSON.parse(rawdata);
  
    res.send(JSON.stringify(aggregationData));
    
    res.end(200);
})

// History Functions

const historySchema = new mongoose.Schema({
  username: String,
  queryString: String,
  results: String
});

const record = mongoose.model('userhistory', historySchema);

/*
*/

function getHistory (username) {
  if(username === "admin"){
    record.find({}).then(function(){
      console.log("Data deleted"); // Success
    }).catch(function(error){
      console.log(error); // Failure
    });
  } else {
    record.find({ username: username }).then(function(){
      console.log("Data deleted"); // Success
    }).catch(function(error){
      console.log(error); // Failure
    });
  }
}


function addToHistory(username, queryString, Results){
  
  var newRecord = new record ({
    username: username,
    queryString: queryString,
    results: Results,
  })

  newRecord.save((error, data) => {
    if (error) {
      console.log(error);
      res.status(200).end();

    } else {
      console.log(queryString + "Noted in history!");
      res.status(200).end();
    }
  })
}

function clearHistory(username){

  console.log("History Cleared!");

  if(username === "admin"){
    record.deleteMany({}).then(function(){
      console.log("Data deleted"); // Success
    }).catch(function(error){
      console.log(error); // Failure
    });
  } else {
    record.deleteMany({ username: username }).then(function(){
      console.log("Data deleted"); // Success
    }).catch(function(error){
      console.log(error); // Failure
    });
  }
}


// HISTORY MANAGER GET HISTORY, ADD TO HISTORY, CLEAR HISTORY, GET USER HISTORY

dealer.get('/history/:userslug',(req,res)=>{

})

dealer.get('/history/clear',(req,res)=>{
  
})

dealer.post('/history/add/',(req,res)=>{
  
})

// SERVER 

dealer.listen(port, () => {

  console.log(`API Started at http://localhost:${port}`);

});

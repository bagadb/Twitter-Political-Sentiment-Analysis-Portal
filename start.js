const express = require("express");
const favicon = require("serve-favicon"); 
const dealer = express();
const bodyparser = require("body-parser");

const port = 8080
const root = { root: __dirname }
const path = require('path')

console.log("Starting Backend Server!!");

dealer.use(favicon(path.join(__dirname, 'favicon.ico'), 10))
dealer.use(bodyparser.json())

dealer.get('/style.css', (req, res) => {
  res.sendFile('./style.css', root )
})

dealer.get('/', (req, res) => {
  res.sendFile('./index.html', root )
})

dealer.post('/', (req,res) => {
    console.log(req.body)
})

dealer.listen(port, () => {
  console.log(`API Started at http://localhost:${port}`)
})
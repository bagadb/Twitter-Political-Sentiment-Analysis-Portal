const express = require("express");
const favicon = require("serve-favicon"); 
const dealer = express();
const port = 8080
const root = { root: __dirname }
const path = require('path')

console.log("Starting Backend Server!!");

dealer.use(favicon(path.join(__dirname, 'favicon.ico'), 10))

dealer.get('/', (req, res) => {
    res.sendFile('./index.html', root )
  })

dealer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
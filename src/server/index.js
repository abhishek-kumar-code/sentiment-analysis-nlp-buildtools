const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require("node-fetch")

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

let baseURL = `https://api.meaningcloud.com/sentiment-2.1?`;
// API Key Developer Credentials
let apiKey = process.env.API_KEY
let tailURL = `&lang=en`;

// Setup empty JS object to act as endpoint for all routes
projectData = [];

// POST request
app.post('/addURL', addURL);

function addURL(req, res){
   
    newEntry = {
      newURL: req.body.userURL
    }
    projectData.push(newEntry)
    console.log(projectData)

    const apiURL = `${baseURL}${apiKey}${req.body.userURL}${tailURL}`;

    getTextAnalysis(apiURL)
    .then(function(data){
        res.send(data);

    })
  }

// ASYNC FUNCTION: GET request to Meaning Cloud API
const getTextAnalysis = async(apiURL)=>{
    // ASYNC: fetch from the URL, default GET request
    console.log(apiURL);

    const response = await fetch(apiURL);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

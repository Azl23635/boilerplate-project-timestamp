// index.js
// where your node app starts

// init project

var express = require('express');
var app = express();

require('dotenv').config();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//Convert date to required formats
const dateConvertJson = date => {
  
  let dateFormatted;
  (date == parseInt(date).toString()) ? (dateFormatted = parseInt(date)) : dateFormatted = date;
  let dateUTC = (new Date(dateFormatted)).toUTCString();
  console.log(dateFormatted, date, dateUTC);

  if (dateUTC == 'Invalid Date') {
    return {error: 'Invalid Date'};
  }
  else {
    return {'unix':Date.parse(dateUTC), 'utc':`${dateUTC}`};
  }
}

app.get('/api/', (req, res) => {
  res.json(dateConvertJson(Date.now()));
})

app.use('/api/:date', (req, res) => {
  
  let dateInput = req.params.date;
  
  res.json(dateConvertJson(dateInput));
})
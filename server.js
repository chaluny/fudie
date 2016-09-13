console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var db
MongoClient.connect('mongodb://chaluny:maccabi22@ds021046.mlab.com:21046/foodie', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(5000, () => {
    console.log('listening on 3000')
  })
})
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
app.get('/seeit', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    res.redirect('/')
    // send HTML file populated with quotes here
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


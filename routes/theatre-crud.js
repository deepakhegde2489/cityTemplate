
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({
 
  theatreName: String,
  theatreCity: String,
  theatreTime: String,
  
  /*moviLanguage: String,
  moviGenre: String,
  moviPoster: String,
  moviDirector: String,
  moviActors: String*/
 });
var Theatre = mongoose.model('Theatre', theatreSchema, 'theatre');

//Movie
router.get('/getTheatre', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/getTheatre/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addTheatre', function(req, res){
 console.log(req.body);
  
 
  var name = req.body.theatreName;
  var name1 = req.body.theatreCity;
  var name2 = req.body.theatreTime;
  /*var language = req.body.Language;
  var genre = req.body.Genre;
  var poster = req.body.Poster;
  var director = req.body.Director;
  var actors = req.body.Actors;*/

  var theatre = new Theatre({
   
    theatreName: name,
    theatreCity: name1,
    theatreTime: name2,
   /*moviLanguage: language,
    moviGenre: genre,
    moviPoster: poster,
    moviDirector: director,
    moviActors: actors*/
   
  });

  theatre.save(function(err, docs){
    if ( err ) throw err;
    console.log("Theatre Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteTheatre/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateTheatre/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;




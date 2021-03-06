
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var showtimeSchema = mongoose.Schema({
 
  showtimeTime: String,
  /*moviLanguage: String,
  moviGenre: String,
  moviPoster: String,
  moviDirector: String,
  moviActors: String*/
 });
var Showtime = mongoose.model('Showtime', showtimeSchema, 'showtime');

//Movie
router.get('/getShowtime', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Showtime.find({}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/getShowtime/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Showtime.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addShowtime', function(req, res){
 console.log(req.body);
  
 
  var name = req.body.showtimeTime;
  /*var language = req.body.Language;
  var genre = req.body.Genre;
  var poster = req.body.Poster;
  var director = req.body.Director;
  var actors = req.body.Actors;*/

  var showtime = new Showtime({
   
    showtimeTime: name,
   /*moviLanguage: language,
    moviGenre: genre,
    moviPoster: poster,
    moviDirector: director,
    moviActors: actors*/
   
  });

  showtime.save(function(err, docs){
    if ( err ) throw err;
    console.log("Showtime Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteShowtime/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Showtime.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateShowtime/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Showtime.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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




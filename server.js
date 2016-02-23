var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongodb =   require('mongodb');
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://192.168.99.100:27017/test';


mongoose.connect(url);

var User = mongoose.model('User',{name:String, tags:Array, image:String});


// user2.save(function(err, userObj){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(userObj);
//   }
// });


// var user2 = new User({name:'tom'});
//
// User.findOne({name:'tom'}, function(err, userObj){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(userObj);
//   }
// });

// MongoClient.connect(url, function(err, db){
//   if(err){
//     console.log('Unable to connect', err);
//   }else{
//     console.log('Connection established to', url);
//     var collection = db.collection('users');
//     var user1 = {name:'test', tags:['kevv', 'keka']};
//     collection.insert([user1], function(err, result){
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         console.log('Inserted %d records, with id %d',result.length, result)
//       }
//       db.close();
//     });
//   }
// });
//
// MongoClient.connect(url, function(err, db){
//
//   if(!err){
//
//   var collection = db.collection('users');
//   collection.find({name:'test'}).toArray(function(err, result){
//     if(err){
//       console.log(err);
//     }else{
//       console.log( result);
//     }
//     db.close();
//   });
//       }
// });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    console.log(req.query.tag);
    var tag  = req.query.tag;
    if(tag){
      console.log(tag);
      User.find({tags:tag}, function(err, users){
          if(err){
            console.log(err);
            res.json({error:err});
          }else{
            res.json(users);
          }
      });
    }

});

router.post('/',function(req, res){
  var requestBody = req.body;
  var user = new User({name:requestBody.name,tags:requestBody.tags, image:requestBody.image});

  user.save(function(err, userObj){
    if(err){
      console.log(err);
    }else{
      res.json(userObj);
    }
  });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static('public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


function logError(err){
  if(err){
      console.log(err);
  }
}

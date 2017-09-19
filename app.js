
// APP CONFIG

var bodyParser = require('body-parser')
,     mongoose = require('mongoose')
,      express = require('express')
,          app = express();

mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema)


//===========** RESTFUL ROUTES

// MAIN FEED
app.get('/', function(req,res){
  res.redirect('/blogs');
})

// LIST ALL
app.get('/blogs', function(req,res){
  
  // retrieve all blogs from database
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// CREATE
app.post('/blogs', function(req,res){

  // Retrieve data from form
  var title = req.body.title;
  var imageURL = req.body.imageURL;
  var body = req.body.body;
  var newPost = { title: title, image: imageURL, body: body};

  // Create campground and save to database
  Blog.create(newPost, function(err, newCreated){

    if (err) {
      console.log(err);
    } else {
      res.redirect('/blogs');
    };
  });
});


// SHOW FORM
app.get('/new', function(req,res){
  res.render('new');
});




// SERVER

app.listen(8080, function(){
  console.log('==> SERVER RUNNING: http://localhost:8080/ ...')
});
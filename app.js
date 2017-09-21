
// APP CONFIG

var bodyParser = require('body-parser')
,     mongoose = require('mongoose')\
,      express = require('express')
,          app = express();

mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG

var blogSchema = new mongoose.Schema({
  blog: {
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
  }
});

var Blog = mongoose.model('Blog', blogSchema)


//===========** RESTFUL ROUTES

// MAIN FEED

app.get('/', function(req,res){
  res.redirect('/blogs');
})

// LIST ALL

app.get('/blogs', function(req,res){
  var blogs = req.body.blog;
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
  // var title = req.body.blog.title;
  // var image = req.body.blog.image;
  // var body = req.body.blog.body;
  // var newPost = { title: title, image: image, body: body};

  // Create campground and save to database
  Blog.create(req.body.blog, function(err, newBlog){
    if (err) {
      res.render('new');
      console.log(err);
    } else {
      // redirect to blogs
      res.redirect('/blogs');
    };
  });
});


// SHOW FORM

app.get('/blogs/new', function(req,res){
  res.render('new');
});




// SERVER

app.listen(8080, function(){
  console.log('==> SERVER RUNNING: http://localhost:8080/ ...')
});
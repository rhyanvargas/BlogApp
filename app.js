// UTILITES
var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app',{useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


// SCHEMA -> MODEL - MONGOOSE
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);


//************  ROUTES

// DISPLAY ALL BLOGS
app.get('/blogs', (req,res) =>{
  Blog.find({}, (err, posts) =>{
    if(err){
      console.log(err);
    } else {
       res.render('index', {posts: posts});
    };
  });
});


// CREATE
app.post('/blogs', (req,res)=> {
  // create a blog object
  Blog.create(req.body.post, (err,newBlog) =>{
    if (err) {
      console.log(err);
      res.render('new');
    } else {
      // redirect to blogs route
        res.redirect('/blogs');
    };
  });
});

// SHOW NEW FORM
app.get('/blogs/new', (req,res) =>{
  res.render('new');
});

// SERVER
app.listen(3000, function(){
  console.log('SERVER RUNNING http://localhost:3000...');
});

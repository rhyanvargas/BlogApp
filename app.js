// UTILITES
var bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app',{useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


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

// SHOW POST
app.get('/blogs/:id', (req,res)=>{
  // 1. Take in the id 
  // 2. Find the corresponding post
  // 3. Render the show template for that post
  Blog.findById(req.params.id, (err,foundPost)=>{
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {post: foundPost});
    }
  })
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req,res)=>{
  Blog.findById(req.params.id, (err, foundPost)=>{
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('edit', {post: foundPost});
    };
  });
});

// UPDATE ROUTE
app.put('/blogs/:id', (req,res)=>{
  // Find and Update post: model.FindByIdAndUpdate(id, newData, callback)
  Blog.findByIdAndUpdate(req.params.id,req.body.post, (err, updatedPost)=>{
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id)
    };
  });
});

// SERVER
app.listen(3000, function(){
  console.log('SERVER RUNNING http://localhost:3000...');
});

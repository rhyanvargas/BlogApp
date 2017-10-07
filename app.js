// UTILITES
var bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sanitizer = require('express-sanitizer'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://heroku_t2g3rfsd:c84ft0ee4uu2iq9v9403er3itf@ds111565.mlab.com:11565/heroku_t2g3rfsd',{useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
// expresss-sanitizer must go right after bodyParser
app.use(sanitizer());
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

// HOME REDIRECT TO BLOGS
app.get('/', (req,res) =>{
  res.redirect('/blogs');
});

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

// CREATE POST
app.post('/blogs', (req,res)=> {
  // 1. Upon submission: sanitize the body to prevent javascript code from executing...
  req.body.post.body = req.sanitize(req.body.post.body)

  // 2. Then create a blog object with the cleaned content
  Blog.create(req.body.post, (err,newBlog) =>{
    if (err) {
      console.log(err);
      res.render('new');
    } else {
        // 3. redirect to blogs route
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
  // 1. Sanitize the body before submitting
  req.body.post.body = req.sanitize(req.body.post.body);

  // 2.) Find and Update post: model.FindByIdAndUpdate(id, newData, callback)
  Blog.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost)=>{
    if (err) {
      res.redirect('/blogs');
    } else {
      // 3. Redirect
      res.redirect('/blogs/' + req.params.id)
    };
  });
});

// DELETE ROUTE
app.delete('/blogs/:id', (req,res)=>{
  // 1. Destroy Blog
  Blog.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
    if (err) {
      res.redirect('/blogs');
    } else {
      // 2. Redirect somewhere
      res.redirect('/blogs')
    }
  })

});

// SERVER - dynamically listen for the port that heroku defines, or port 3000
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

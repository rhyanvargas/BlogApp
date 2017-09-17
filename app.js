
// APP CONFIG

var bodyParser = require('body-parser')
,     mongoose = require('mongoose')
,      express = require('express')
,          app = express();

mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});
app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var blog = mongoose.model('blog', blogSchema)


//  RESTFUL ROUTES






// SERVER

app.listen(3000, function(){
  console.log('==> SERVER RUNNING....')
});
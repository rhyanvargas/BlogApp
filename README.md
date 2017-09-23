TECH STACK
=============
**Databse: mongoDB**
- *Object-modeling: mongoose*
**Server: node.js**
- *Server Framework: express.js*
**Templating-engine: EJS **
**Frontend: HTML + CSS + Javscript**
- *CSS Framework: SemanticUI*

USING RESTful Routes for CRUD
=============

name      |     url       |    verb     |   description
-------------------------------------------------------------------------------
INDEX     /campgrounds        GET        Display list of campgrounds
NEW       /campgrounds/new    GET        Shows form to create new campground
CREATE    /campgrounds        POST       Add campground to Database
SHOW      /campgrounds/:id    GET        Displays info about one campground


RANDOM LESSONS LEARNED
=============
- **Stick to using one style of quotes `" "` when setting attributes for html elements in ejs file** 
..Otherwise upon rendering, it will throw an error that will take forever to figure out!!!
```
SyntaxError: missing ) after argument list in /Volumes/Rhyan_Storage_Internal/my-storage/rhyanvargas/Google Drive/Web-Projects/webdevbootcamp_coltSteele/BlogApp/views/show.ejs while compiling ejs
```

- **Using `<%-` actually evaluates the data passed in between** ...I used this to pass in `post.body` in order to allow users to add code when creating their post. *SECURITY: I `sanitize` the inputs in order to prevent `scripts` injection. 

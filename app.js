//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Load the full build.
const _ = require("lodash");



const app = express();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


mongoose.set('strictQuery', true); //Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.connect("mongodb+srv://admin-gonzalo:test1234@cluster0.ina3ysf.mongodb.net/blogDB", {  useUnifiedTopology: true, useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: String
});

const Post = mongoose.model("Post", postSchema);

const post1 = new Post({
  name:"Day 1",
  content: aboutContent
});

const post2= new Post({
  name:"Day 2",
  content: contactContent
});

//let posts =[];

//fillArray();


app.get("/", function(req,res){

  Post.find(function(err,foundList){
    if(!err){
      if(foundList.length===0){
        Post.insertMany([post1,post2], function(err){
          if(!err){
            console.log("Succesfully saved all the items to blogDB");
          }
        });
        res.redirect("/");
      }else{
        res.render("home", { startingContent :homeStartingContent, postsList: foundList});
      }
    }
  });


});

app.get("/about", function(req,res){
  res.render("about", { startingContent :aboutContent });
});

app.get("/contact", function(req,res){
  res.render("contact", { startingContent :contactContent });
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.get('/posts/:postTitle', function (req, res) {
  //res.send(req.params.postTitle)
  const requestedTitle= _.capitalize(req.params.postTitle);

  Post.findOne({name: requestedTitle}, function(err, foundItem) {
    if (typeof foundItem !== "undefined"){
      res.render("post", { postContent : foundItem });
    }
  });
  /*
  const found = posts.find(element => _.lowerCase(element.title) === requestedTitle);

  if (typeof found !== "undefined"){
    res.render("post", { postContent : found });
  }*/


});

//    Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.

app.post("/compose", function(req,res){

  const post= new Post({
    name:req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
  res.redirect("/");
});
/*
function fillArray(){
  let post={
    title:"Day 1",
    content:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
  };
  posts.push(post);
  post={
    title:"Day 2",
    content:"Hac habgdgdsgfitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
  };
  posts.push(post);
  post={
    title:"Day 3",
    content:"Hac habgdgdsgfitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
  };
  posts.push(post);
}

*/


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

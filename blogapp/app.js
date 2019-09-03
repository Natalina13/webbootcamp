var express = require('express'),
	app = express(),
	methodOverride = require("method-override"),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	http = require('http'),
	expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var blogSchema = mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: 'Desk Setup',
// 	image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
// 	body: "Thats how I like to set my desk."
	
// })

app.get('/', (req,res) =>{
	res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log(err);
		}
		else{
			res.render('index', {blogs: blogs});
		}
	});
});

app.get('/blogs/new', (req, res) =>{
	res.render("new");
});

app.post('/blogs', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err){
			res.render('new');
		}
		else{
			res.redirect('/blogs');
		}
	})
})

app.get('/blogs/:id', (req,res) => {
	Blog.findById(req.params.id, (err, foundblog)=>{
		if(err){
			res.redirect("/bogs");
		}
		else{
			res.render('show', {blog: foundblog})
		}
	})
})

app.get('/blogs/:id/edit', (req,res) => {
	Blog.findById(req.params.id, (err, foundblog) => {
		if(err){
			console.log(err);
		}
		else{
			res.render("edit", {blog: foundblog});
		}
	})
});

app.put('/blogs/:id', (req, res) => {
req.body.blog.body = req.sanitize(req.body.blog.body);	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedblog) => {
		if(err){
			res.redirect('/blogs');
		}
		else{
			res.redirect('/blogs/'+req.params.id)
		}
	});
});

app.delete('/blogs/:id', (req, res)=>{
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});
var hostname = '127.0.0.1';
var port = 3000;

app.listen(port, hostname, () =>{
	console.log(`Server running at http://${hostname}:${port}/`);
})
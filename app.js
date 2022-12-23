const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const methodOverride = require('method-override')
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')


const Post = require('./models/Post')

//middlewares
const app = express()
app.use(express.static('public'))
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))


//connect db
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db')

process.on('warning', (warning) => {
    console.log(warning.stack);
})


app.get('/', postController.getAllPosts) //index
app.get('/posts/:id', postController.getPost) //post's single page
app.post('/posts', postController.createPost) //add blog post - post operation
app.put('/posts/:id', postController.updatePost) //update post
app.delete('/posts/:id', postController.deletePost) //delete post

//routing
app.get('/about', pageController.getAboutPage) //about page
app.get('/add_post', pageController.getAddPage) //add page
app.get('/posts/edit/:id', pageController.getEditPage) //update page


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
  








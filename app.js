const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const methodOverride = require('method-override')


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


app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
  posts
  })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/posts/:id', async (req, res) => {
  //console.log(req.params.id)
  //res.render('about')
  const post = await Post.findById(req.params.id)
  res.render('post',{
    post
  })
})

app.get('/add_post', (req, res) => {
    res.render('add_post')
})
  

//add blog post - post operation
app.post('/posts', async (req, res) => {
  // console.log(req.body)
  await Post.create(req.body)
  res.redirect('/')
})

//update routing
app.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findOne({_id: req.params.id})
  res.render('edit', {post})
})

//update post
app.put('/posts/:id', async (req, res) => {
  const post = await Post.findOne({_id: req.params.id})
  post.title = req.body.title
  post.detail = req.body.detail
  post.save()

  res.redirect(`/posts/${req.params.id}`)
})

//delete post
app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id)
  res.redirect('/')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
  








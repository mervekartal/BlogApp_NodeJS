const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')

const Blog = require('./models/Blog')

const app = express()
app.use(express.static('public'))
app.set("view engine", "ejs")


//connect db
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db')

process.on('warning', (warning) => {
    console.log(warning.stack);
})


app.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.render('index', {
  blogs
  })
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})
  

  //add blog content - post operation
  app.post('/blog', async (req, res) => {
    await Blog.create(req.body)
    res.redirect('/')
  })


  const port = 3000;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
  });
  








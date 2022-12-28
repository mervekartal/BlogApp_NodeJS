const Post = require('../models/Post')

// exports.getAllPosts = async (req, res) => {
//     const posts = await Post.find({}).sort('-dateCreated')
//     res.render('index', {
//     posts: posts
//     })
// }

//pagination operations added: 
exports.getAllPosts = async (req, res) => {

    const postsPerPage = 3 //bir sayfada görünen post sayısı
    const page = req.query.page || 1 //requestten gelen sayfa no (eğer yoksa 1.sayfa yani anasayfa)
    const totalPosts = await Post.find().countDocuments() //toplam post sayısı (db'deki documents sayısı)

    const posts = await Post.find({}).sort('-dateCreated').skip((page-1)*postsPerPage).limit(postsPerPage)
    
    //postlar, bulunulan sayfa ve sayfa sayısı render ediliyor. 
    res.render('index', {
    posts: posts, 
    current: page,
    pages: Math.ceil(totalPosts / postsPerPage)
 })

}

exports.getPost = async (req, res) => {
    //console.log(req.params.id)
    //res.render('about')
    const post = await Post.findById(req.params.id)
    res.render('post',{
      post: post
    })
}

exports.createPost = async (req, res) => {
    // console.log(req.body)
    await Post.create(req.body)
    res.redirect('/')
}

exports.updatePost = async (req, res) => {
    const post = await Post.findOne({_id: req.params.id})
    post.title = req.body.title
    post.detail = req.body.detail
    post.save()
  
    res.redirect(`/posts/${req.params.id}`)
}

exports.deletePost = async (req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
}











var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/create',function (req,res,next) {
  res.render('create', { title: 'Create a new blog' });

});
router.get('/blogs',function (req,res,next) {
  Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });

});

router.get('/blogs/:id',function (req,res,next) {
  const id = req.params.id;
  Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
        res.render('error', { title: 'Blog not found' });
      });

});
router.delete('/blogs/:id',function (req,res,next) {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });

});

router.post('/blogs',function (req,res) {
  const blog = new Blog(req.body);
  console.log(req.body)
  blog.save().then(
      result => {
        res.redirect('/blogs');
      }
  ).catch(err =>{
    console.log(err);
  })

})

module.exports = router;

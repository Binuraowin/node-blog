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

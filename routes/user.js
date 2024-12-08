const express = require('express');
const productHelpers = require('../helpers/product.helpers');
const router = express.Router();
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');


/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((product) => {
    res.render('user/view-all-products', { product, admin: false })
  })
});

router.get('/login', (req, res) => {
  res.render('user/user-login')
})

router.get('/signup', (req, res) => {
  res.render('user/user-sigup')
})

router.post('/signup', (req, res)=>{
  userHelper.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})

module.exports = router;

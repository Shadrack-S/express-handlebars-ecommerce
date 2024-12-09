const express = require('express');
const productHelpers = require('../helpers/product.helpers');
const router = express.Router();
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');


/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const user = req.session.user;
    const products = await productHelpers.getAllProducts();
    res.render('user/view-all-products', { product: products, admin: false, user });
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error
    res.status(500).render('error', { error: 'Failed to load products' }); // Render an error page or send a JSON response
  }
});


router.get('/login', (req, res) => {
  res.render('user/user-login')
})

router.get('/signup', (req, res) => {
  res.render('user/user-sigup')
})

router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then(() => {
    res.send("success")
  })
})

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;

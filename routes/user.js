var express = require('express');
const productHelpers = require('../helpers/product.helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((product) => {
    res.render('user/view-all-products', { product, admin: false })
  })
});

module.exports = router;

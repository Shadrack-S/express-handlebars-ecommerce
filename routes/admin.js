var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product.helpers')

const product = [
  {
    title: "Samsung S23 Ultra 5G",
    description: "Made By Samsung ",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29QFQZeYjtzL10rPxlp2g4VZf8WWDIBtKBA&s",
    price: "90,999",
    currency: "INR",
    rating: "4.5"

  },
  {
    title: "Samsung S24 Ultra 5G",
    description: "Made By Samsung ! ",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29QFQZeYjtzL10rPxlp2g4VZf8WWDIBtKBA&s",
    price: "1,24,999",
    currency: "INR",
    rating: "4.4"

  }, {
    title: "Iphone 15 Pro Max 512 GB",
    description: "Made By Apple ",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWYKGh7XS7mLvN-979p7Sxx3qBZvCGOqMzw&s",
    price: "99,999",
    currency: "INR",
    rating: "4.4"

  }
]

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('admin/view-products', { product, admin: true })
});

router.get('/add-product', (req, res) => {
  res.render('admin/add-product')
})

router.post('/add-product', (req, res) => {

  productHelper.addProduct(req.body, (id) => {
    let productImage = req.files.productImage
    productImage.mv('./public/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render('admin/add-product')
      }else{
        console.log(err);
      }
    })
  })
})

module.exports = router;

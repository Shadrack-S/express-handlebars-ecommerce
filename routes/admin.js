var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product.helpers')


/* GET users listing. */
router.get('/', function (req, res) {
  productHelper.getAllProducts().then((product) => {
    res.render('admin/view-products', { product, admin: true })
  })
});

router.get('/add-product', (req, res) => {
  res.render('admin/add-product', { admin: true })
})

router.post('/add-product', (req, res) => {

  productHelper.addProduct(req.body, (id) => {
    let productImage = req.files.productImage
    productImage.mv('./public/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render('admin/add-product')
      } else {
        console.log(err);
      }
    })
  })
})

router.get('/edit-product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productHelper.getAProduct(productId)
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('admin/edit-product', { product, admin: true });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
})

router.get('/delete-product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await productHelper.deleteAProduct(productId)
    if (product) {
      res.redirect('/admin')
    }
  } catch {
    res.status(500).send('Internal Server Error');
  }
})

router.post('/edit-product/:productId', async (req, res) => {
  try {
    req.body.id = req.params.productId
    const updatedProduct = await productHelper.editProduct(req.body);
    if (updatedProduct) {
      // Successful update
      res.redirect('/admin')
      
    } else {
      // Product not found or update failed
      res.status(404).json({
        success: false,
        message: 'Failed to update product or product not found'
      });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product',
      error: error.message
    });
  }
});

module.exports = router;

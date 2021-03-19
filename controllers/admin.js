const Product = require('../models/product');

//controllers are all the middleware functions

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //If we find it, it will define true else it will give undefined (which is also treated as false)
  //This is a kind of redundant thing to do, bcz here we actually know that we want to edit the product
  if (!editMode) { //if we dont't define editMode in url then this will get undefined (which will be taken as false)
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/'); //Not a good user experience, most of the times we would want to show an error
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
}

exports.postEditProduct = (req, res, next) => {
  //Since it is a post request, we expect to get that information in the request body
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId);
  product.save().then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll() //this also returns a promise
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
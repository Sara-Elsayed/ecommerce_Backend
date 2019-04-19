var express = require('express');
var router = express.Router();
const createError = require('http-errors');
var Product = require('../models/product');
const authenticationMiddleware = require('../middlewares/authentication');

//get all products
router.get('/',async (req,res,next) =>{
let products = await Product.find();
res.send(products);
});

//get by id 
router.get('/:productId', async (req,res,next)=>{
    let product = await Product.findById(req.params.productId);
    res.send(product);
});

router.use(authenticationMiddleware);

//post product 
router.post('/',(req,res,next)=>{
    const{name, description,category, price, discount, isOnSale , image,userid  } = req.body;
    const product = new Product({name, description, category,price, discount, isOnSale,image,userid});
    product.save((err)=>{
    if(err) return next(createError(400,err));
    res.send(product)
  });
});



/// get products per user
router.get('/user/:userid', async (req,res,next) => {
    let products = await Product.find({userid : req.params.userid});
    res.send(products);
    });

router.delete('/:productId',async (req,res,next) => {
    let toBeDeleted = await Product.findByIdAndDelete(req.params.productId);
    res.send(toBeDeleted);
});
    
router.patch('/:productId', (req,res,next) => {
    let updated = Product.findByIdAndUpdate(req.params.productId, req.body);
    res.send(updated);
});
    
module.exports = router;
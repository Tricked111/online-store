import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const PAGE_SIZE = 3;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);






productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/user',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id });
    res.send(products);
  })
);




productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});








  productRouter.post(
      '/createService',
      isAuth,
      expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
          name: req.body.name,
          slug: req.body.name,
          image: req.body.image || '/images/noimg.jpg',
          category: 'Service',
          description: req.body.description,
          price: req.body.price,
          rating: 0,
          numReviews: 0,
          countInStock: 1000,
          contact: req.body.contact,
          user: req.user._id,
    
    
        });
    
        const product = await newProduct.save();
        res.status(201).send({ message: 'New Service Created', product });
      })
    );




    productRouter.post(
      '/createProduct',
      isAuth,
      expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
          name: req.body.name,
          slug: req.body.name,
          image: req.body.image || '/images/noimg.jpg',
          category: 'Product',
          description: req.body.description,
          price: req.body.price,
          rating: 0,
          numReviews: 0,
          countInStock: req.body.countInStock,
          contact: req.body.contact,
          user: req.user._id,
          brand: req.user.brand,
    
    
        });
    
        const product = await newProduct.save();
        res.status(201).send({ message: 'New Service Created', product });
      })
    );


      



    productRouter.delete(
      '/:id',
      isAuth,
      expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
          await product.remove();
          res.send({ message: 'Product Deleted' });
        } else {
          res.status(404).send({ message: 'Product Not Found' });
        }
      })
    );
export default productRouter;
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';
import { isAuth } from '../utils.js';






/* const serviceRouter = express.Router();
serviceRouter.post(
  '/createService',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newService = new Service({
      name: req.body.name,
      slug: req.body.name,
      image: 'sample',
      category: 'Service',
      description: req.body.description,
      price: req.body.price,
      rating: 0,
      numReviews: 0,
      contact: req.body.contact,
      user: req.user._id,


    });

    const service = await newService.save();
    res.status(201).send({ message: 'New Service Created', service });
  })
);
export default serviceRouter; */
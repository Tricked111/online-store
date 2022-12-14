/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Daniil Tiurin (xtiuri02)
 * 
 *****************************************************************************/
import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth,generateToken } from '../utils.js';
import mongoose from 'mongoose';


const userRouter = express.Router();

userRouter.get(
  '/',
  expressAsyncHandler(async (req,res) => {
    const users = await User.find()
    if(users){
      res.send(users)
    }
  })
);




userRouter.get('/:id', async (req, res) => {
  var id = new mongoose.Types.ObjectId(req.params.id);
  const users = await User.findOne({ _id: id});
  if (users) {
    res.send(users);
  } else {
    res.status(404).send({ message: 'users Not Found' });
  }
});

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.link = req.body.link || user.link;
        user.image = req.body.image ? `/images/${req.body.image}` : user.image;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
  
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser),
        });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
  );

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      image: '/images/noimg.jpg',
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

export default userRouter;
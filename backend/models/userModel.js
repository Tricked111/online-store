import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: {type: String,required: false},
    link: {type: String,required: false},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, require: true},
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
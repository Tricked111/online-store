import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: false},
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: false },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    contact: {type: String,require: false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
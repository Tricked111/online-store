import mongoose from 'mongoose';


const serviceSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      slug: { type: String, required: true, unique: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      rating: { type: Number, required: false },
      numReviews: { type: Number, required: false },
      contact: {type: String,require: false},
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    },
    {
      timestamps: true,
    }
  );


const Service = mongoose.model('Service', serviceSchema);
export default Service;
import  express  from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db');
})
.catch((err) => {
    console.log(err.message);
});


const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.get('/api/products',(req,res) => {
    res.send(data.products)
});




const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});
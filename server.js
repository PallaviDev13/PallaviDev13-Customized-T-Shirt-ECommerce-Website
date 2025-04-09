import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';



dotenv.config()
connectDB();
const app = express()
app.use(cors({credentials:true,origin:true}));
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(fileUpload());



app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get('/', (req,res) =>{
    res.send("<h1>Customized T-Shirt ECommerce Website</h1>");
});
const PORT = process.env.PORT;
app.listen(PORT , () =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

dotenv.config();

export const createProductController = async (req, res) => {
  try {
    console.log("hello from controller")
    
    const {name, description, price, category, quantity} = req.body
    
    
      
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        
        return res
          .status(500) 
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.create({ ...req.body, slug: slugify(name),photo:photo});
    console.log(products)
   return  res.status(201).send({
      success: true,
      products,
      message: "Product Created Successfully",
      
    });
  }catch(err) {
    res.status(404).send({
      success: false,
      err,
      message: "Error in crearing product",
    });
  }
 
};


export const getProductController = async (req, res) => {
  try {
    const products = await productModel
  .find({
    $or: [
      { isCustomized: false },
      { isCustomized: { $exists: false } }
    ]
  })
  .populate("category")
  .select("-photo")
  .limit(12)
  .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const User = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
    console.log(User)
    const user  =  await userModel.findById(User._id)
    
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    console.log("hello update")
    const { name, description, price, category, quantity, shipping } =req.body;
      
        const  photo  = req.files.photo
        console.log(name)
      
  
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(req.params.pid,{ ...req.body, slug: slugify(name) ,photo:photo},
      { new: true }
    );

    console.log(products,"products")
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  }catch(error) {
    
    res.status(404).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    
    args.$or = [
      { isCustomized: false },
      { isCustomized: { $exists: false } }
    ];
    const products = await productModel.find(args);
    
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({
        $or: [
          { isCustomized: false },
          { isCustomized: { $exists: false } }
        ]
      })
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};



export const CreateCustomizeProduct = async(req,res)=>{
  try{
    const {Product_Id} = req.body
    const { photo } = req.files

    if(Product_Id && photo){

      const product  = await productModel.findById(Product_Id)
      product._id=null
      product.__v=null
      const {Auth} = req.cookies
      console.log(Auth)
          
          const User = JWT.verify(Auth,
               process.env.JWT_SECRET
              );
      
      if(product){
        
        const products = new productModel({name:product.name,description:product.description,price:product.price,category:product.category, slug: slugify(`${product.name} (customized)`) , photo:photo , isCustomized:true , customizedBy:User._id});
        if (photo) {
          products.photo.data = photo.data;
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product Customized Successfully",
          products,
        });


      }else{
        res.status(401).send({
          success:false,
          err:"Product not found",
          message:"Product not found"
        })
      }
    }else{
      res.status(401).send({
        success:false,
        err:"Product Id Error or Photo Error ",
        message:"Product Id not found"
      })
    }
  }catch(err){
    res.status(404).send({
      success:false,
      err,
      message:err.message
    })
  }
}

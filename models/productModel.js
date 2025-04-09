import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      default:1,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    isCustomized:{
      type:Boolean,
      default:false
    },
    customizedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
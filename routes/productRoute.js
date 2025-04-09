import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  CreateCustomizeProduct
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug",getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);
router.get("/product-category/:slug", productCategoryController);
router.post("/create-customize-product",CreateCustomizeProduct)

export default router;
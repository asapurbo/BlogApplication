import { Router } from "express";
import upload from "../config/multer.config.js";
import {
  blogPostsSearch,
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  getBlogPosts,
  updateBlogPost,
  updateImage,
} from "../controllers/blogPost/blogPost.controller.js";
const router = Router();
router
  .post("", upload.single("image"), createBlogPost)
  .get("/search-posts", blogPostsSearch)
  .get("/:id", getBlogPost)
  .get("", getBlogPosts)
  .patch("/:id", updateBlogPost)
  .patch("/update-image/:id", upload.single("image"), updateImage)
  .delete("/:id", deleteBlogPost);

export default router;

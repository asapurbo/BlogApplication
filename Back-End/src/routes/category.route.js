import { Router } from 'express';
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory
} from "../controllers/categories/category.controller.js";
const router = Router();
router
    .get('',getCategories)
    .post('',createCategory)
    .patch('/:id',updateCategory)
    .delete('/:id',deleteCategory)
export default router;
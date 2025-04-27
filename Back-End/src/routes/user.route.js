import { Router } from 'express';
import {deleteUser, getUser, updateUser} from "../controllers/users/user.controller.js";
const router = Router();
router
    .get('/:id',getUser)
    .patch('/:id',updateUser)
    .delete('/:id',deleteUser)

export default router;
import {Router} from 'express';
import {createReactToBlog, getBlogReactions} from "../controllers/reactions/reaction.controller.js";

const router = Router();
router
    .post('/:blogId', createReactToBlog)
    .get('/:blogId', getBlogReactions);

export default router;
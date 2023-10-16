import express from 'express';
import {getfeedposts,getuserposts,likepost} from '../Controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router=express.Router();

//READ
router.get('/',verifyToken,getfeedposts);
router.get('/:userid/posts',verifyToken,getuserposts);

//UPDATE
router.patch('/:userid/like',verifyToken,likepost);




export default router;
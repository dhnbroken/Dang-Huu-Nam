import { Router } from 'express';
import CPostController from '../controllers/posts.controller';
const router = Router();

router.get('/', CPostController.getAllPosts);
router.get('/:id', CPostController.getPost);

router.post('/', CPostController.createPost);
router.put('/:id', CPostController.updatePost);

router.delete('/:id', CPostController.deletePost);

export default router;

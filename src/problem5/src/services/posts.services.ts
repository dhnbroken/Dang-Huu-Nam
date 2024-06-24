import { Request } from 'express';
import Post from '../models/posts.model';

interface PostResponse {
  data?: any;
  status: number;
  error?: { message: string };
}

class PostService {
  public getAllPosts = async (req: Request): Promise<PostResponse> => {
    try {
      const { userId, title, body } = req.query;

      const filters: Record<string, any> = {};
      if (userId) filters.userId = userId.toString();
      if (title) filters.title = { $regex: new RegExp(title.toString(), 'i') };
      if (body) filters.body = { $regex: new RegExp(body.toString(), 'i') };

      const posts = await Post.find(filters);

      if (!posts.length) {
        return { status: 404, error: { message: 'No posts found' } };
      }

      return {
        data: posts,
        status: 200
      };
    } catch (err: any) {
      console.error('Error fetching posts:', err.message);
      return {
        status: 500,
        error: {
          message: err.message
        }
      };
    }
  };

  public getPost = async (req: Request): Promise<PostResponse> => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      if (!post) {
        return { status: 404, error: { message: 'Post not found' } };
      }
      return {
        data: post,
        status: 200
      };
    } catch (error: any) {
      console.error(error.message);
      return {
        status: 500,
        error: {
          message: 'An error occurred while fetching the post'
        }
      };
    }
  };

  public createPost = async (req: Request): Promise<PostResponse> => {
    const { userId, title, body } = req.body;

    if (!userId || !title || !body) return { status: 400, error: { message: 'Missing required fields' } };

    try {
      const post = new Post(req.body);
      await post.save();
      return {
        data: post,
        status: 201
      };
    } catch (err: any) {
      return {
        status: 500,
        error: {
          message: err?.message
        }
      };
    }
  };

  public updatePost = async (req: Request): Promise<PostResponse> => {
    try {
      const id = req.params.id;
      const post = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (!post) {
        return { status: 404, error: { message: 'Post not found' } };
      }
      return {
        data: post,
        status: 200
      };
    } catch {
      return {
        status: 500,
        error: {
          message: 'An error occurred while updating the post'
        }
      };
    }
  };

  public deletePost = async (req: Request): Promise<PostResponse> => {
    try {
      const id = req.params.id;

      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return { status: 404, error: { message: 'Post not found' } };
      }
      return {
        data: {},
        status: 200
      };
    } catch {
      return {
        status: 500,
        error: {
          message: 'An error occurred while deleting the post'
        }
      };
    }
  };
}

const insPostService = new PostService();
export default insPostService;

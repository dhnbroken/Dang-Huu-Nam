import { NextFunction, Request, Response } from 'express';
import apiResponse from '../../util/ApiResponse';
import insPostService from '../services/posts.services';

class Post {
  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await insPostService.getAllPosts(req);
      apiResponse.result(res, result);
      return;
    } catch (error: any) {
      console.error(`Error occurred`, error.message);
      next(error);
    }
  }

  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await insPostService.getPost(req);
      apiResponse.result(res, result);
    } catch (error: any) {
      console.error(`Error occurred`, error.message);
      next(error);
    }
  }

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await insPostService.createPost(req);
      apiResponse.result(res, result);
    } catch (error: any) {
      console.error(`Error occurred`, error.message);
      next(error);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await insPostService.updatePost(req);
      apiResponse.result(res, result);
    } catch (error: any) {
      console.error(`Error occurred`, error.message);
      next(error);
    }
  }

  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await insPostService.deletePost(req);
      apiResponse.result(res, result);
    } catch (error: any) {
      console.error(`Error occurred`, error.message);
      next(error);
    }
  }
}

const PostController = new Post();
export default PostController;

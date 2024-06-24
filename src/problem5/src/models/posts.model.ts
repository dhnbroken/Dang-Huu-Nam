import { Schema, model } from 'mongoose';

export interface IPost {
  userId: string;
  title: string;
  body: string;
}

const postSchema = new Schema<IPost>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
  },
  { timestamps: true }
);

const Post = model<IPost>('Post', postSchema);
export default Post;

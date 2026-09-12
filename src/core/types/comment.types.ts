export interface Comment {
  id: number;
  author: string;
  authorId: number;
  text: string;
  createdAt: string;
}

export interface AddComment {
  text: string;
  postId: number;
}
import { StatusPost } from "@/util/constants";

export interface IPost {
  id: string;
  title: string;
  description: string;
  creator: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusPost;
  category: string;
}


export interface IPostCategory{
  id: string;
  name: string;
  status: string;
  creator: string;
  category: string;
}
export interface CreatePostArguments{
  title?: string;
  description?: string;
  creator?: string;
  category?: string;
}
export interface CreatePostResponse{
  message: string,
  code: number
}

export interface PostRequestQuery {
  currentPage?: number;
  size?: number;
  status?: StatusPost;
}

export interface GetPostListResponse {
    items: IPost[],
    currentPage: number,
    size: number,
    total: number
}

export interface GetPostCategoryListResponse {
    items: IPostCategory[],
}

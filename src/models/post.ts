import { IUser } from "@/models/user";
import { StatusPost } from "@/util/constants";

export interface IPost {
  id: string;
  title: string;
  description: string;
  creator: IUser;
  createdAt: Date;
  updatedAt: Date;
  status: StatusPost;
  approver?: IUser;
  feedback?: string;
  category: IPostCategory;
}


export interface IPostCategory{
  id: string;
  name: string;
  status: string;
  creator: string;
}
export interface CreatePostArguments{
  title?: string;
  description?: string;
  creator?: string;
  category?: string;
}

export interface ApprovePostArgs {
  id: string;
  status: StatusPost;
  approver: string;
  feedback: string
}
export interface CreatePostResponse{
  message: string,
  code: number
}
export interface ApprovePostResponse{
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

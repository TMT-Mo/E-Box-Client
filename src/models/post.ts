import { StatusPost } from "@/util/constants";

export interface IPost {
  id: string;
  title: string;
  description: string;
  creator: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusPost;
}

export interface PostRequestQuery {
  currentPage?: number;
  size?: number;
  status?: StatusPost;
}

export interface GetPostListResponse {
    items: IPost[],
    currentPage: number,
    size: number
}

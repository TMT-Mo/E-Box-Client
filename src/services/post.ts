import { CreatePostArguments, CreatePostResponse, GetPostCategoryListResponse, GetPostListResponse, PostRequestQuery } from "@/models/post";
import { apis } from "@/util/api";
import { httpClient } from "@/util/http-client";

const getPostList = async(params: PostRequestQuery) => {
    const response = await httpClient.get({url: apis.post.getPostList, params})
    return response.data as GetPostListResponse
}
const getPostCategoryList = async() => {
    const response = await httpClient.get({url: apis.post.getCategoryList})
    return response.data as GetPostCategoryListResponse
}

const createPost = async(args: CreatePostArguments) => {
    const response = await httpClient.post({url: apis.post.createPost, data: args})
    return response.data as CreatePostResponse
}

export const postServices = {
    getPostList,
    getPostCategoryList,
    createPost
}
import { GetPostListResponse, PostRequestQuery } from "@/models/post";
import { apis } from "@/util/api";
import { httpClient } from "@/util/http-client";

const getPostList = async(params: PostRequestQuery) => {
    const response = await httpClient.get({url: apis.post.getPostList, params})
    return response.data as GetPostListResponse
}

export const postServices = {
    getPostList
}
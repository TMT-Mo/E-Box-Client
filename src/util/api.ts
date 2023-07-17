

const API_HEAD = import.meta.env.VITE_API

export const apis = {
    user:  {
        login: `${API_HEAD}/user/login`,
        getUserList: `${API_HEAD}/user/getUserList`,
        refreshToken: `${API_HEAD}/user/refreshToken`,
    },
    post: {
        getPostList: `${API_HEAD}/post/getPostList`,
        getCategoryList: `${API_HEAD}/post/getCategoryList`,
        createPost: `${API_HEAD}/post/createPost`,
        approvePost: `${API_HEAD}/post/updatePost`,
    },
    activity:  {
        getActivityList: `${API_HEAD}/activity/getActivityList`,
    },
}
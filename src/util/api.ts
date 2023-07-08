const API_HEAD = 'http://localhost:5000/api'

export const apis = {
    user:  {
        login: `${API_HEAD}/user/login`,
        getUserList: `${API_HEAD}/user/getUserList`,
        refreshToken: `${API_HEAD}/user/refreshToken`,
    },
    post: {
        getPostList: `${API_HEAD}/post/getPostList`,
    }
}
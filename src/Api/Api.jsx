import axios from "axios";
import { BACKEND_URL } from "../constants";


const baseApi = axios.create({
    baseURL: BACKEND_URL,
})
baseApi.interceptors.request.use(config => {
    config.headers["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
    return config;
})

export const createPost = (description,tag,location,imageSrc,type) => baseApi.post('/item/createpost',{
    itemDescription: description,
    itemTag: tag,
    location: location,
    imageSrc: imageSrc,
    type: type
})

export const deletePost = (id) => baseApi.delete('/item/deletepost/' + id)

export const getAllPosts = (postType,sortBy) => baseApi.get(`/item/getallposts?type=${postType}&sort=${sortBy}`);
export const getPost = (id) => baseApi.get('/item/getpost/'+id);
export const postComment = (comment,postId) => baseApi.post('/item/postcomment/',{
    comment: comment,
    postId: postId
});
export const claimItem = (id) => baseApi.post("/item/claimitem",{
    itemId : id
});
export const report = (postid,description) => baseApi.post("/item/report",{
    postId: postid,
    description: description
})
export const getTags = (q) => baseApi.get("/item/gettags?q=" + q)
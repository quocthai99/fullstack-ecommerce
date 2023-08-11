import axios from "../axiosConfig";

export const apiGetCategories = () => axios({
    url: '/prodcategory',
    method: 'get'
})
import axios from '../axiosConfig'

export const apiGetProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})
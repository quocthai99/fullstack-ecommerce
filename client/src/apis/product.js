import axios from '../axiosConfig'

export const apiGetProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})

export const apiGetProduct = (pid) => axios({
    url: '/product/'+ pid,
    method: 'get',
})
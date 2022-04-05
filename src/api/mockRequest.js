import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL:'/mock',  // 请求接口的 路径中 会 携带 /api
    timeout:5000,
})

request.interceptors.request.use(config=>{
    nprogress.start();
    return config;
})

request.interceptors.response.use(res=>{
    nprogress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('file'))
})
export default request;
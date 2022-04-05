import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ABC: process.env.VUE_APP_ABC;
const request = axios.create({
    //baseURL:'/api',  // 请求接口的 路径中 会 携带 /api
    baseURL:BASEURL,
    timeout:5000,
})

request.interceptors.request.use(config=>{
    nprogress.start(); 
    console.log('localStorage',localStorage.getItem('UUIDTOKEN'))
    // 先从仓库里取 uuid 取出来后 在请求头里添加一个字段userTempId   userTempId 是和后台商量好的字段
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带 token 给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config;
})

request.interceptors.response.use(res=>{
    nprogress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('file'))
})
export default request;
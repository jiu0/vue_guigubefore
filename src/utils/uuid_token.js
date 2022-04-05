import { v4 as uuidv4 } from 'uuid';
//要生成一个 随机字符串  且每次执行 不能发生变化 游客身份持久化
export const getUUID = ()=>{
    // 先看浏览器缓存里有没有 uuid  有直接才能够缓存取   没有就生成一个 
   let uuid_token = localStorage.getItem('UUIDTOKEN')
   if(!uuid_token){
      uuid_token = uuidv4();
      localStorage.setItem('UUIDTOKEN',uuid_token)
   }
    // 切记 有返回值  没有返回  就是Undefined
    return uuid_token
}
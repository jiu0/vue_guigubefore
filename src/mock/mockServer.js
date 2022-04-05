import Mock from 'mockjs'
// webpack 默认对外暴露  图片 json 数据格式
import banner from './banner.json'
import floor from './floor.json'
import order from './order.json'
import adress from './adress.json'

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
//获取 订单信息  线上接口 报错 
Mock.mock('/mock/order',{code:200,data:order})
// 获取 地址信息  线上接口 返回的地址是个空数组
Mock.mock('/mock/adress',{code:200,data:adress})

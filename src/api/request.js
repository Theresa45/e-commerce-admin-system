// axios的二次封装
import axios from "axios";
import nprogress from "nprogress";

// 利用axios对象的create方法创建一个axios实例对象
const service = axios.create({
  // axios实例对象
  // 基础路径
  baseURL: "/mock/api", // url = base url + request url
  // 设置请求超时的时间：5s
  timeout: 5000, // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前进行一些设置
    nprogress.start();
    // config：配置对象，可以设置请求头
    console.log(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    nprogress.done();
    const res = response.data;
    console.log(res);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 对外暴露才能使用二次封装的axios发送请求
export default service;

// 模拟后端服务器
// 使用 Mock
// 引入Mock对象
const Mock = require("mockjs");
import { tokens, users } from "./user";

// 模拟服务器发送响应数据
// Mock.mock( rurl, rtype, template )：当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
// 登录账号
Mock.mock("/mock/api/user/login", "post", (config) => {
  const res = JSON.parse(config.body);
  const token = tokens[res.username];

  // token不存在
  if (!token) {
    return {
      code: 401,
      message: "用户名和密码不正确。",
    };
  }

  return {
    code: 200,
    data: token,
  };
});

// 获取用户信息
Mock.mock("/mock/api/user/info", "get", (config) => {
  const { token } = config.query;
  const info = users[token];

  // 登录失败
  if (!info) {
    return {
      code: 401,
      message: "登录失败，不能获取用户信息",
    };
  }

  return {
    code: 200,
    data: info,
  };
});

// 退出账号
Mock.mock("/mock/api/user/logout", "post", () => {
  return {
    code: 200,
    data: "success",
  };
});

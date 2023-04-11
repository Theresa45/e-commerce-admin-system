// 统一接口管理
import request from "./request";

// data:{username:'',password:''}
export const login = (data) => {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
};

export const getInfo = (token) => {
  return request({
    url: "/user/info",
    method: "get",
    params: { token },
  });
};

export const logout = () => {
  return request({
    url: "/user/logout",
    method: "post",
  });
};

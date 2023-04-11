// 用户登录时，勾选记住密码，系统会将登录信息存入浏览器cookie中，下次登录时系统会自动将信息回写在输入框中（默认设置保存时间为3天，此处需要将密码进行加密处理，以提高安全性）
// 使用js-cookie将token存储在cookie中

import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

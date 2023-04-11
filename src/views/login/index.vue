<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-container">
        <img src="@/assets/logo.png" />
      </div>
      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>
      <!-- 登录表单 -->
      <!-- 只要焦点一离开文本框，就需要对表单数据进行校验。 -->
      <!-- 在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。 -->
      <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。另外，组件还需要使用使用自定义验证规则。 -->
      <!-- 1.配置rules，绑定 :rules="loginFormRules" -->
      <!-- 2.配置prop属性，绑定校验规则 -->
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 使用username验证规则验证表单数据项 -->
          <!-- 使用语法糖无法输入内容 -->
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="iconfont icon-user-s"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            prefix-icon="iconfont icon-lock-s"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <!-- 发送请求之前还要对表单数据进行验证 -->
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  name: "Login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          // 必选项 提示信息(给用户看的) 触发要求
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 自定义校验回调函数必须被调用才能使用。
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          // 必选项 提示信息 触发要求
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单数据
    resetLoginForm() {
      // 表单组件实例对象的resetFields方法可以对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.loginFormRef.resetFields();
    },
    // 发起登录请求
    login() {
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
      this.$refs.loginFormRef.validate(async (valid) => {
        // valid：用于业务逻辑处理的表单验证结果
        if (!valid) return;
        // 发起登录请求
        const res = await login(this.loginForm);
        if (res.code !== 200) return this.$message.error("登录失败！");
        this.$message({
          message: "登录成功！",
          type: "success",
        });
        // 保存token
        window.sessionStorage.setItem("token", res.data.token);
        // 编程式导航
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
@bg: #283443;

.login-container {
  height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-box {
    width: 450px;
    position: relative;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    // background-color: #fff;
    // 居中对齐
    // margin: 0 auto;

    .avatar-container {
      position: relative;
      width: 100px;
      height: 100px;
      left: 50%;
      transform: translate(-50%);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .title-container {
      position: relative;
      margin: 0 auto 40px auto;

      .title {
        font-size: 26px;
        color: #fff;
        text-align: center;
        font-weight: bold;
      }
    }

    .login-form {
      position: relative;
      width: 100%;
      bottom: 0;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: hidden;

      /* 重设 element-ui css */
      .el-input {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        height: 47px;

        ::v-deep .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          color: #fff;
          height: 47px;
        }
      }

      .el-button {
        width: 45%;
      }

      .el-button + .el-button {
        margin-left: 10%;
      }
    }
  }
}
</style>

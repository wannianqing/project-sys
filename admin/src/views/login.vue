<script lang="ts" setup>
import { useRouter } from "vue-router";

import { ElMessage, type FormInstance } from "element-plus";
import { setStorage } from "@/utils";
import { loginUserApi } from "@/apis";
import { ParameterResponse } from "@/utils/types";
const router = useRouter();

const BASEURL = import.meta.env.VITE_BASEURL;

const verifyCode = ref<string>(`${BASEURL}/public/code`);
const resetCode = () =>
  (verifyCode.value = verifyCode.value + "?" + Math.random());

const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: ""
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }]
});
const loading = ref<boolean>(false);
  const store = useStore();
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      loginUserApi(loginForm)
        .then(async (res: ParameterResponse) => {
          if (res.code === 200) {
            setStorage("token", res.data);
            await store.dispatch("generateRoutes");
            router.push({ path: "/dashboard/home" });
          } else {
            ElMessage.warning(res.msg);
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
</script>
<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="info">
        <p class="title">用户登录</p>
        <p class="sub-title">青牛前端后台管理系统</p>
      </div>
      <el-form ref="formRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            size="default"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            size="default"
            placeholder="输入用户密码"
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button
            size="default"
            :loading="loading"
            type="primary"
            class="submit"
            @click="handleLogin(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 400px;
    padding: 0 26px 24px 26px;
    .info {
      text-align: center;
      padding: 12px;
      .title {
        font-size: 24px;
        padding: 10px 0;
      }
      .sub-title {
        font-size: 14px;
        color: var(--ma-shallow-font-color);
      }
    }
    .verify-code {
      width: 100%;
      display: flex;
      .left {
        flex: 1;
      }
      img {
        height: 31px;
        border-radius: 4px;
        margin-left: 4px;
      }
    }
    .submit {
      width: 100%;
    }
  }
}
</style>

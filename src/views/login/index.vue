<template>

  <div class='app-container'>
    <div class="login-container">

      <img src="@/assets/logo.png"
           class="app-login-logo" />

      <el-form ref="loginForm"
               :model="loginForm"
               class="login-form"
               autocomplete="on"
               label-position="left">

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-checkbox v-model="checked">记住账号</el-checkbox>

        <el-button class="el-btn-login"
                   :loading="loading"
                   round
                   type="primary"
                   style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // generate accessible routes map based on roles
          //   const accessRoutes = await this.$store.dispatch('permission/generateRoutes', "admin")

          //   // dynamically add accessible routes
          //   this.$router.addRoutes(accessRoutes)

          //   console.log(this.$router);

          //   this.$router.push('/home')
          //   this.$router.push({
          //     path: this.redirect || '/',
          //     query: this.otherQuery
          //   })
          //   this.loading = false
          this.$message({
            message: '用户名和密码错误',
            type: 'error'
          })
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

 <style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}

.login-container {
  .el-input {
    width: 80%;
    input {
      color: #fff;
      background: transparent;
      -webkit-appearance: none;
      border: 0px;
      caret-color: #fff;
      padding: 0px;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition-delay: 99999s;
      transition: color 99999s ease-out, background-color 99999s ease-out;
    }

    input::-webkit-input-placeholder {
      color: #fff;
    }
    input::-moz-input-placeholder {
      color: #fff;
    }
    input::-ms-input-placeholder {
      color: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background: url('../../assets/img/bg_login.jpg') no-repeat center;
  background-size: cover;
  background-position: 50% 50%;
}

.login-container {
  width: 360px;
  height: 460px;
  margin-right: 100px;
  display: flex;
  padding: 50px 60px 60px 60px;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(37, 103, 145, 0.7);
  overflow: hidden;

  .app-login-logo {
    height: 100px;
  }

  .login-form {
    position: relative;
    overflow: hidden;
  }

  .el-form-item {
    height: 36px;
    border-bottom: 1px solid #fff;
    margin-right: 20px;
  }

  .svg-container {
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .el-checkbox {
    color: #fff;
  }

  .el-btn-login {
    margin-top: 20px;
    background-color: #2a96d4;
    border-color: #2a96d4;
  }
}
</style>

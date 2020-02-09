<template>
  <div class="navbar">
    <el-row class="el-row-header">
      <el-col :offset="6"
              :span="12"
              class="el-col-title">
        <div>威尔药业 · 智慧检验管理系统</div>
      </el-col>
      <el-col :span="6">
        <div class="right-menu">
          <el-dropdown class="avatar-container right-menu-item hover-effect"
                       trigger="click">
            <div class="name-wrapper">
              <span class="user-name">{{name}}</span>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/profile/index">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided
                                @click.native="logout">
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row class="el-row-breadcrumb">
      <hamburger id="hamburger-container"
                 :is-active="sidebar.opened"
                 class="hamburger-container"
                 @toggleClick="toggleSideBar" />

      <div class="el-small-title">- {{smallTitle}} -</div>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'device'])
  },
  data() {
    return {
      smallTitle: null
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )

      let levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )

      if (levelList) {
        let length = levelList.length
        if (length > 0) {
          let level = levelList[length - 1]
          this.smallTitle = level.meta.title
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 148px;
  overflow: hidden;
  position: relative;
  background: #4f9f9d;

  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .el-row-header {
    height: 100px;
    border-left: solid 2px #fff;
  }
  .el-row-breadcrumb {
    height: 48px;
    background: #fff;
    line-height: 48px;
    text-align: center;
    color: #4f9f9d;
    border-bottom: solid 1px #4f9f9d;
  }

  .el-col-title {
    color: #fff;
    font-size: 24px;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }

  .el-small-title {
    // padding-left: 50px;
    padding-right: 50px;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    fill: #4f9f9d;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    margin-top: 60px;
    line-height: 30px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .name-wrapper {
        margin-top: 5px;
        position: relative;
        color: #fff;

        .user-name {
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

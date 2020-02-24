<template>
  <div>
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
                <el-dropdown-item @click.native="modifyPass">
                  <span style="display:block;">修改密码</span>
                </el-dropdown-item>
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
    <el-dialog :visible.sync="dialogModifyVisible"
               append-to-body
               width="20%"
               title="修改密码">
      <div class="dialog-title"><span>修改密码</span></div>
      <el-divider></el-divider>
      <el-form ref="dataForm"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="el-dialog-item"><label class="w3"
                 style="margin-right:-0.5em">旧密码</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>
        <div class="el-dialog-item"><label class="w3"
                 style="margin-right:-0.5em">新密码</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>
        <div class="el-dialog-item"><label>确认密码</label>：
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="green"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          完成
        </el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="dialogModifyVisible"
               append-to-body
               width="20%"
               title="新增用户">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>新增用户</span></div>
        <el-divider></el-divider>
        <div class="el-dialog-item"><label class="w2">部门</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>
        <div class="el-dialog-item"><label class="w2">职务</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>

        <div class="el-dialog-item"><label class="w2">工号</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>

        <div class="el-dialog-item"><label class="w2">姓名</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>

        <div class="el-dialog-item"><label class="w3"
                 style="margin-right:-0.5em">用户名</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>

        <div class="el-dialog-item"><label class="w2">密码</label><label>：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 120px" />
        </div>
      </el-form>
      
    </el-dialog> -->
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
      smallTitle: null,
      dialogModifyVisible: false,
      temp: {}
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
    modifyPass() {
      this.dialogModifyVisible = true
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

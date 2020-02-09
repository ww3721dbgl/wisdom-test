<template>
  <div class="app-sidebar">
    <div class="sidebar-logo-container"
         :class="{'collapse':collapse}">
      <transition name="sidebarLogoFade">
        <div v-if="collapse"
             key="collapse"
             class="sidebar-logo-link">
          <img v-if="logo"
               :src="logo"
               class="sidebar-logo">
          <h1 v-else
              class="sidebar-title">{{ date }} </h1>
        </div>
        <div v-else
             key="expand"
             class="sidebar-logo-link">
          <el-row>
            <img v-if="logo"
                 :src="logo"
                 class="sidebar-logo">
          </el-row>
          <el-row>
            <h1 class="sidebar-title">{{ date| parseTime('{y}-{m}-{d} {h}:{i}:{s}')  }} </h1>
          </el-row>
        </div>
      </transition>
    </div>
    <el-row class="sidebar-logo-line-container">
      <div class="sidebar-logo-line-badge"></div>
      <div class="sidebar-logo-line"></div>
    </el-row>
  </div>
</template>

<script>
// import { parseTime } from '@/utils'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      title: '2019-10-11 13:05:15',
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      date: new Date()
    }
  },
  mounted() {
    var that = this
    this.timer = setInterval(function() {
      that.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) //在vue实例销毁钱，清除我们的定时器
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 144px;
  background: #4f9f9d;
  text-align: center;
  overflow: hidden;
  //   border-bottom: solid 2px #32bad8;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 50px;
      margin-top: 30px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 80px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

.sidebar-logo-line-container {
  display: flex;
}

.sidebar-logo-line-badge {
  height: 7px;
  width: 7px;
  margin-left: 10px;
  background-color: #fff;
  padding: 0;
  right: 0;
  border-radius: 50%;
}
.sidebar-logo-line {
  height: 1px;
  width: 183px;
  margin-top: 3px;
  background-color: #fff;
}
</style>

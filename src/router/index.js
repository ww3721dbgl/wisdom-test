import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* 路由模块 */
import Layout from "@/layout";

const main = () => import("@/views/redirect/index.vue");
const home = () => import("@/views/home/index.vue");
const login = () => import("@/views/login/index.vue");

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: main
      }
    ]
  },
  {
    path: "/login",
    component: login,
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: home,
        name: "Home",
        meta: { title: "信息", icon: "home", affix: true }
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: "/sending-station",
    component: Layout,
    name: "sending-station",
    meta: {
      title: "送检",
      icon: "sending_station"
    },
    children: [
      {
        path: "sending",
        component: () => import("@/views/sending/sending.vue"),
        name: "Sending",
        meta: { title: "样品送检" }
      },
      {
        path: "material-coding",
        component: () => import("@/views/sending/material-coding.vue"),
        name: "material-coding",
        meta: { title: "物料编码" }
      }
      //   ,
      //   {
      //     path: "report-query",
      //     component: () => import("@/views/sending/report-query.vue"),
      //     name: "report-query",
      //     meta: { title: "报告查询"}
      //   },
      //   {
      //     path: "report-printing",
      //     component: () => import("@/views/sending/report-printing.vue"),
      //     name: "report-printing",
      //     meta: { title: "报告打印"}
      //   }
    ]
  },
  {
    path: "/inspection-area",
    component: Layout,
    name: "inspection-area",
    meta: {
      title: "检验",
      icon: "inspection_area"
    },
    children: [
      {
        path: "sample-detection",
        component: () => import("@/views/inspection/sample-detection.vue"),
        name: "sample-detection",
        meta: { title: "样品检测" }
      },
      {
        path: "test-method",
        component: () => import("@/views/inspection/test-method.vue"),
        name: "test-method",
        meta: { title: "检验方法" }
      },
      {
        path: "quality-standard",
        component: () => import("@/views/inspection/quality-standard.vue"),
        name: "quality-standard",
        meta: { title: "质量标准" }
      },
      //   {
      //     path: "recheck-printing",
      //     component: () => import("@/views/inspection/recheck-printing.vue"),
      //     name: "recheck-printing",
      //     meta: { title: "复检打印"}
      //   },
      {
        path: "sample-management",
        component: () => import("@/views/inspection/sample-management.vue"),
        name: "sample-management",
        meta: { title: "存样管理" }
      }
    ]
  },
  {
    path: "/approval",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/approval/index.vue"),
        name: "approval",
        meta: { title: "审批", icon: "approval" }
      }
    ]
  },
  {
    path: "/check",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/check/index.vue"),
        name: "check",
        meta: { title: "检效", icon: "check" }
      }
    ]
  },
  {
    path: "/param",
    component: Layout,
    name: "inspection-area",
    meta: {
      title: "参数",
      icon: "param"
    },
    children: [
      {
        path: "inspection-specification",
        component: () => import("@/views/param/inspection-specification.vue"),
        name: "inspection-specification",
        meta: { title: "检验规则" }
      },
      {
        path: "index",
        component: () => import("@/views/param/index.vue"),
        name: "param-manage",
        meta: { title: "参数管理" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: {
      title: "系统",
      icon: "system"
    },
    children: [
      {
        path: "notice",
        component: () => import("@/views/system/notice.vue"),
        name: "notice",
        meta: { title: "信息交互" }
      },
      {
        path: "user",
        component: () => import("@/views/system/user.vue"),
        name: "user",
        meta: { title: "用户管理" }
      },
      {
        path: "organization",
        component: () => import("@/views/system/organization.vue"),
        name: "organization",
        meta: { title: "组织管理" }
      },
      {
        path: "role",
        component: () => import("@/views/system/role.vue"),
        name: "role",
        meta: { title: "角色权限管理" }
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        name: "logs",
        meta: { title: "系统日志" }
      },
      {
        path: "backup",
        component: () => import("@/views/system/backup.vue"),
        name: "backup",
        meta: { title: "数据备份查看" }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

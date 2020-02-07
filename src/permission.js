import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress 构造

const whiteList = ["/login", "/auth-redirect"]; // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开始加载
  NProgress.start();
  // 设置标题
  document.title = getPageTitle(to.meta.title);

  // 确定用户是否已登录
  const hasToken = getToken();

  console.log("hasToken", hasToken);

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取用户信息
          const { roles } = await store.dispatch("user/getInfo");

          console.log("roles", roles);

          // 根据角色生成可访问的路线图
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // 动态添加可访问的路线
          router.addRoutes(accessRoutes);

          // hack方法，以确保addRoutes是完整的
          // 设置replace：true，因此导航将不会留下历史记录
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* 无token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next();
    } else {
      // 其他无权访问的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

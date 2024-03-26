import { getStorage } from "@/utils";
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { IMenuObj, IBaseMenu } from "@/utils/types";

interface EagerDefaultFunc {
  default: RouteRecordRaw;
}

type EagerLoadedModules = Record<string, EagerDefaultFunc>;

const routeFiles: EagerLoadedModules = import.meta.glob("./modules/*.ts", {
  eager: true,
});
export const routeConfiguras: RouteRecordRaw[] = [];
Object.keys(routeFiles).forEach((routeModule) => {
  routeFiles[routeModule].default &&
    routeConfiguras.push(routeFiles[routeModule].default);
});

const matchedRoute = (data: IMenuObj[], routeConfiguras: RouteRecordRaw[]) => {
  let res: RouteRecordRaw[] = [];
  routeConfiguras.forEach((menu: RouteRecordRaw) => {
    data.forEach((item: IMenuObj) => {
      if (menu.name === item.component) {
        let childs: RouteRecordRaw[] = [];
        (menu.children as RouteRecordRaw[]).forEach((cmenu: RouteRecordRaw) => {
          item.children.forEach((citem: IBaseMenu) => {
            if (cmenu.name === citem.component) {
              childs.push(cmenu);
            }
          });
        });
        menu.children = childs;
        res.push(menu);
      }
    });
  });
  return res;
};

const asyncRoutes = () => {
  const store = useStore();
  const data = store.getters.getSyncRoutes;
  if (!data.length) return;
  return matchedRoute(data, routeConfiguras);
};

const changeRoute = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!to.matched.length) {
    next("/404");
  }
  const url = to.path;

  if (url === "/login") {
    next();
  } else if (getStorage("token")) {
    next();
  } else {
    next("/login");
  }
};

export const useMiddleware = (router: Router) => {
  let registerRouteFresh = true;
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const routes = asyncRoutes();
      if (registerRouteFresh) {
        if (!routes) {
          changeRoute(to, from, next);
          return;
        }
        routes.forEach((route: any) => {
          router.addRoute(route);
        });
        next({ ...to, replace: true });
        registerRouteFresh = false;
      }
      changeRoute(to, from, next);
    }
  );
};

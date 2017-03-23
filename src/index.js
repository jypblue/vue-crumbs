/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-01-24 00:35:14
 * @version $Id$
 */

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  Object.defineProperties(Vue.prototype, {
    $crumbs: {
      get() {
        // 获取路由信息
        const route = this.$route;
        const router = this.$router;
        const currentpath = route.path.replace(/\//g, '');
        let parent = route.meta.parent;
        const crumbs = [];
        const routesArr = [];
        routesArr.push(route);

        // 递归查找父节点路径，查找对应的路由信息
        while (parent && parent.length > 0) {
          let matched = router.match(parent);
          routesArr.unshift(matched);
          parent = matched.meta.parent || '';
        }
        // 循环组装面包屑url及名称
        for (let i = 0; i < routesArr.length; i++) {
          const breadcrumbs = routesArr[i].meta.breadcrumb;
          if (breadcrumbs && breadcrumbs.length > 0) {
            for (let j = 0; j < breadcrumbs.length; j++) {
              const crumbspath = (breadcrumbs[j].url || routesArr[i].path).replace(/\//g, '');
              const hidden = breadcrumbs[j].hidden;
              if (currentpath === crumbspath && !!hidden) {
                break;
              }
              crumbs.push(breadcrumbs[j]);
            }
          }
        }
        return crumbs;
      }
    }
  });

  Vue.component('breadcrumb', {
    template: '<ul class="breadcrumb" v-if="$crumbs.length">' +
      '<li v-for="(crumb, i) in $crumbs">' +
      '<router-link v-if="i < $crumbs.length-1" :to="{ path: crumb.url }">{{ crumb.name }}</router-link>' +
      '<a v-else>{{ crumb.name }}</a>' +
      '</li>' +
      '</ul>'
  });

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
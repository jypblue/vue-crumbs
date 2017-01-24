/*!
 * vue-crumbs v1.0.0
 * https://github.com/jypblue/vue-crumbs
 * Released under the MIT License. 
 */

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
			get: function () {
				// 获取路由信息
				var route = this.$route,
				    router = this.$router,
				    currentpath = route.path;
				var parent = route.meta.parent,
				    crumbs = [],
				    routesArr = [];
				routesArr.push(route);

				// 递归查找父节点路径，查找对应的路由信息
				while (parent && parent.length > 0) {
					var matched = router.match(parent);
					routesArr.unshift(matched);
					parent = matched.meta.parent || '';
				}
				// 循环组装面包屑url及名称
				for (var i = 0; i < routesArr.length; i++) {
					var breadcrumbs = routesArr[i].meta.breadcrumb;
					if (breadcrumbs && breadcrumbs.length > 0) {
						for (var j = 0; j < breadcrumbs.length; j++) {
							var crumbspath = breadcrumbs[j].url || routesArr[i].path,
							    hidden = breadcrumbs[j].hidden;
							if (currentpath == crumbspath && !!hidden) {
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

	Vue.component('breadcrumbs', {
		template: '<div class="breadcrumbs" v-if="$crumbs.length">' + '<ul>' + '<li v-for="(crumb, i) in $crumbs">' + '<router-link v-if="i < $crumbs.length-1" :to="{ path: crumb.url }">{{ crumb.name }}</router-link>' + '<a v-else>{{ crumb.name }}</a>' + '</li>' + '</ul>' + '</div>'
	});
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin);
}

export default plugin;

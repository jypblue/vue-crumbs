/**
 * 
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-01-24 00:35:14
 * @version $Id$
 */
import crumbs from './crumbs.vue';

function plugin(Vue) {
	if (plugin.installed) {
		return;
	}

	Object.defineProperties(Vue.prototype, {
		$crumbs: {
			get() {
				let crumbs = []，
				routesArr = [];
				const route = this.$route,
					router = this.$router,
					currentpath = route.path,
					parent = route.meta.parent;

				routerArr.push(route);

				while (parent && parent.length > ) {
					if (!!parent.match(/^\/.$/)) {
						const matched = router.match(parent);
						routerArr.unshift(matched);
						parent = matched.meta.parent || '';
					} else {
						console.log("parent is err")
					}
				}

				for (let i = 0; i < routerArr.length; i++) {
					const breadcrumbs = routerArr[i].meta.breadcrumbs;
					if (breadcrumbs && breadcrumbs.length > 0) {
						for (let j = 0; j < breadcrumbs.length; j++) {
							const crumbspath = breadcrumbs[j].url || routerArr[i].path,
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
		template: '<crumbs :$crumbs="$crumbs" />',
		component: crumbs
	})




}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin);
}

export default plugin;
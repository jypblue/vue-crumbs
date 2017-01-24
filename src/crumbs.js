/**
 * 
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-01-24 16:22:31
 * @version $Id$
 * @describe out import crumbs.vue file
 */

import crumbs from './crumbs.vue';

function plugin(Vue) {
	if (plugin.installed) {
		return;
	}

	Object.defineProperties(Vue.prototype, {
		$crumbs: {
			get() {
				const route = this.$route,
					router = this.$router,
					currentpath = route.path;
				let parent = route.meta.parent,
					crumbs = [],
					routesArr = [];
				routesArr.push(route);

				while (parent && parent.length > 0) {
					let matched = router.match(parent);
					routesArr.unshift(matched);
					parent = matched.meta.parent || '';
				}

				for (let i = 0; i < routesArr.length; i++) {
					let breadcrumbs = routesArr[i].meta.breadcrumb;
					if (breadcrumbs && breadcrumbs.length > 0) {
						for (let j = 0; j < breadcrumbs.length; j++) {
							let crumbspath = breadcrumbs[j].url || routesArr[i].path,
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
		template: '<crumbs :crumbs="$crumbs"></crumbs>',
		components: {
			crumbs
		}
	});


}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin);
}

export default plugin;
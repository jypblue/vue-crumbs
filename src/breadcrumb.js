/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-01-24 16:22:31
 * @version $Id$
 * @describe out import crumbs.vue file
 */

import breadcrumb from './breadcrumb.vue';

const install = function(Vue) {
  if (install.installed) return;
  Vue.component('breadcrumb', breadcrumb);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.1.0',
  install,
};


}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
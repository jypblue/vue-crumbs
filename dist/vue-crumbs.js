/*!
 * vue-crumbs v1.2.0
 * https://github.com/jypblue/vue-crumbs
 * Released under the MIT License. 
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueCrumbs = factory());
}(this, (function () { 'use strict';

/**
 *
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-05-25 16:35:14
 * @version 1.2.0
 */

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  Vue.component('breadcrumb', {
    props: {
      mode: {
        type: String,
        default: 'url' },
      rightIcon: {
        type: String,
        default: 'arrow-right'
      }
    },
    data: function () {
      return {
        crumbs: [],
        currentPathStr: this.$route.path.replace(/\//g, '')
      };
    },

    methods: {
      fnUrlCrumbsArr: function () {
        var routesArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var currentPathStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var crumbsArr = [];
        for (var i = 0; i < routesArr.length; i++) {
          var breadcrumb = routesArr[i].meta.breadcrumb;
          if (!!breadcrumb) {
            for (var j = 0; j < breadcrumb.length; j++) {
              var crumbsPathStr = (breadcrumb[j].url || routesArr[i].path).replace(/\//g, '');
              var hidden = breadcrumb[j].hidden;
              if (currentPathStr === crumbsPathStr && !!hidden) {
                break;
              }
              crumbsArr.push(breadcrumb[j]);
            }
          }
        }
        return crumbsArr;
      },
      fnRoutesArr: function () {
        var routesArr = [];
        routesArr.push(this.$route);
        var parent = this.$route.meta.parent;
        while (!!parent) {
          var matched = this.$router.match(parent);
          routesArr.unshift(matched);
          parent = matched.meta.parent;
        }
        return routesArr;
      },
      getUrlModeCrumbs: function () {
        var routesArr = this.fnRoutesArr();
        return this.fnUrlCrumbsArr(routesArr, this.currentPathStr);
      },
      fnNameCrumbsArr: function (routesNameArr, currentPathStr) {
        var crumbsArr = [];
        for (var i = 0; i < routesNameArr.length; i++) {
          var metaCrumbs = routesNameArr[i].route.meta.breadcrumb;
          metaCrumbs = Array.isArray(metaCrumbs) ? metaCrumbs[0] : metaCrumbs;
          if (!!metaCrumbs) {
            var breadcrumb = {
              url: routesNameArr[i].route.path,
              icon: metaCrumbs.icon,
              name: metaCrumbs.name
            };
            var crumbsPathStr = breadcrumb.url.replace(/\//g, '');
            var hidden = breadcrumb.hidden;
            if (currentPathStr === crumbsPathStr && !!hidden) {
              break;
            }
            crumbsArr.push(breadcrumb);
          }
        }
        return crumbsArr;
      },
      fnRoutesNameArr: function () {
        var routesNameArr = [];
        var currentMatched = this.$router.resolve({ 'name': this.$route.name, 'params': this.$route.params });
        routesNameArr.push(currentMatched);
        var parent = this.$route.meta.parent;
        while (!!parent) {
          var matched = this.$router.resolve({ 'name': parent, 'params': this.$route.params });
          routesNameArr.unshift(matched);
          parent = matched.route.meta.parent;
        }
        return routesNameArr;
      },
      getNameModeCrumbs: function () {
        return this.fnNameCrumbsArr(this.fnRoutesNameArr(), this.currentPathStr);
      },
      getMixModeCrumbs: function () {
        var routesArr = [];
        var routesNameArr = [];
        var currentMatched = this.$router.resolve({ 'name': this.$route.name, 'params': this.$route.params });
        routesNameArr.push(currentMatched);
        routesArr.push(this.$route);
        var parent = this.$route.meta.parent;
        while (!!parent) {
          if (parent.indexOf('/') !== -1) {
            var matched = this.$router.match(parent);
            routesArr.unshift(matched);
            parent = matched.meta.parent;
          } else {
            var _matched = this.$router.resolve({ 'name': parent, 'params': this.$route.params });
            routesNameArr.unshift(_matched);
            parent = _matched.route.meta.parent;
          }
        }
        if (this.$route.name && routesNameArr.length >= routesArr.length) {
          return this.fnNameCrumbsArr(routesNameArr, this.currentPathStr);
        } else {
          return this.fnUrlCrumbsArr(routesArr, this.currentPathStr);
        }
      },
      changeCrumbs: function () {
        if (this.mode === 'name') {
          this.crumbs = this.getNameModeCrumbs();
        } else if (this.mode === 'url') {
          this.crumbs = this.getUrlModeCrumbs();
        } else {
          this.crumbs = this.getMixModeCrumbs();
        }
      }
    },
    watch: {
      $route: 'changeCrumbs'
    },
    mounted: function () {
      this.changeCrumbs();
    },

    template: '<ul>' + '<li v-for="(item ,i) in crumbs" >' + '<router-link v-if="i < crumbs.length - 1" :to="{ path: item.url}">' + '<i :class="item.icon" v-if="!!item.icon"></i>' + '<span>{{ item.name }}</span>' + '</router-link>' + '<i :class="rightIcon" v-if="i !== crumbs.length - 1 && rightIcon"></i>' + '<a v-else>' + '<i :class="item.icon" v-if="!!item.icon"></i>' + '<span>{{ item.name }}</span>' + '</a>' + '</li>' + '</ul>'
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

return plugin;

})));

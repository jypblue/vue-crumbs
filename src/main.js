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
        default: 'mix', // name // url
      },
      rightIcon: {
        type: String,
        default: 'arrow-right',
      },
    },
    data() {
      return {
        crumbs: [],
        currentPathStr: this.$route.path.replace(/\//g, ''),
      }
    },
 methods: {
      fnUrlCrumbsArr(routesArr=[], currentPathStr=""){
        const crumbsArr = [];
         for (let i = 0; i < routesArr.length; i++) {
          const breadcrumb = routesArr[i].meta.breadcrumb;
          if (!!breadcrumb) {
            for (let j = 0; j < breadcrumb.length; j++) {
              const crumbsPathStr = (breadcrumb[j].url || routesArr[i].path).replace(/\//g, '');
              const hidden = breadcrumb[j].hidden;
              if (currentPathStr === crumbsPathStr && !!hidden) {
                break;
              }
              crumbsArr.push(breadcrumb[j]);
            }
          }
        }
        return crumbsArr;
      },
      fnRoutesArr(){
        const routesArr = [];
        routesArr.push(this.$route);
        let parent = this.$route.meta.parent;
        while (!!parent) {
          const matched = this.$router.match(parent);
          routesArr.unshift(matched);
          parent = matched.meta.parent;
        }
        return routesArr;
      },
      getUrlModeCrumbs() {
        const routesArr = this.fnRoutesArr();
        return this.fnUrlCrumbsArr(routesArr, this.currentPathStr);
      },
      fnNameCrumbsArr(routesNameArr,currentPathStr) {
        const crumbsArr = [];
        for(let i = 0; i < routesNameArr.length; i++) {
          let metaCrumbs = routesNameArr[i].route.meta.breadcrumb;
          metaCrumbs = Array.isArray(metaCrumbs) ? metaCrumbs[0] : metaCrumbs;
          if(!!metaCrumbs) {
            const breadcrumb = {
              url: routesNameArr[i].route.path,
              icon: metaCrumbs.icon,
              name: metaCrumbs.name
            }
            const crumbsPathStr = breadcrumb.url.replace(/\//g,'');
            const hidden = breadcrumb.hidden;
              if (currentPathStr === crumbsPathStr && !!hidden) {
                break;
              }
            crumbsArr.push(breadcrumb);
          }
        }
        return crumbsArr;
      },
      fnRoutesNameArr(){
        const routesNameArr = [];
        const currentMatched = this.$router.resolve({'name': this.$route.name, 'params': this.$route.params});
        routesNameArr.push(currentMatched);
        let parent = this.$route.meta.parent;
        while(!!parent) {
          const matched = this.$router.resolve({'name': parent, 'params': this.$route.params })
          routesNameArr.unshift(matched);
          parent = matched.route.meta.parent;
        }
        return routesNameArr;
      },
      getNameModeCrumbs(){
        return this.fnNameCrumbsArr(this.fnRoutesNameArr(), this.currentPathStr);
      },
      getMixModeCrumbs() {
        const routesArr = [];
        const routesNameArr = [];
        const currentMatched = this.$router.resolve({'name': this.$route.name, 'params': this.$route.params});
        routesNameArr.push(currentMatched);
        routesArr.push(this.$route);
        let parent = this.$route.meta.parent;
        while (!!parent) {
          if(parent.indexOf('/') !== -1) {
              const matched = this.$router.match(parent);
              routesArr.unshift(matched);
              parent = matched.meta.parent;
          } else {
            const matched = this.$router.resolve({'name': parent, 'params': this.$route.params })
            routesNameArr.unshift(matched);
            parent = matched.route.meta.parent;
          }
        }
        if(this.$route.name&&routesNameArr.length>=routesArr.length){
          return this.fnNameCrumbsArr(routesNameArr,this.currentPathStr);
        } else {
          return this.fnUrlCrumbsArr(routesArr, this.currentPathStr);
        }
      },
      changeCrumbs() {
        switch(this.mode) {
          case 'name':
            this.crumbs = this.getNameModeCrumbs();
            break;
          case 'url':
            this.crumbs = this.getUrlModeCrumbs();
            break;
          default:
            this.crumbs = this.getMixModeCrumbs();
            break;
        }
      },
    },
    watch: {
      $route: 'changeCrumbs',
    },
    mounted(){
      this.changeCrumbs();
    },
    template: '<ul>'+
                '<li v-for="(item ,i) in crumbs" >'+
                  '<router-link v-if="i < crumbs.length - 1" :to="{ path: item.url}">'+
                  '<i :class="item.icon" v-if="!!item.icon"></i>'+
                  '<span>{{ item.name }}</span>'+
                  '</router-link>'+
                  '<i :class="rightIcon" v-if="i !== crumbs.length - 1 && rightIcon"></i>'+
                  '<a v-else>'+
                  '<i :class="item.icon" v-if="!!item.icon"></i>'+
                  '<span>{{ item.name }}</span>'+
                  '</a>'+
                '</li>'+
              '</ul>',
  });

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
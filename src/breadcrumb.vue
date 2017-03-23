<template>
  <ul :class="crumbClass" v-if="crumbs.length">
    <li v-for="(crumb ,i) in crumbs" >
      <i :class="homeIcon" v-if="i===0 && homeIcon"></i>
      <router-link v-if="i < crumbs.length - 1" :to="{ path: crumb.url}"> {{ crumb.name }} </router-link>
      <i :class="rightIcon" v-if="i !== crumbs.length - 1 && rightIcon"></i>
      <a class="crumb-last-item" v-else>{{ crumb.name }}</a>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'breadcrumb',
    props: {
      crumbClass: {
        type: String,
        default: 'crumb',
      },
      homeIcon: {
        type: String,
        default: '',
      },
      rightIcon: {
        type: String,
        default: 'arrow-right',
      },
    },
    data() {
      return {
        crumbs: null,
      };
    },
    methods: {
      getBreadCrumb() {
        const route = this.$route;
        const router = this.$router;
        const currentpath = route.path.replace(/\//g, '');
        let parent = route.meta.parent;
        const crumbs = [];
        const routesArr = [];
        routesArr.push(route);
        while (parent && parent.length > 0) {
          const matched = router.match(parent);
          routesArr.unshift(matched);
          parent = matched.meta.parent || '';
        }
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
      },
      changeBreadCrumb() {
        this.crumbs = this.getBreadCrumb();
      },
    },
    watch: {
      $route: 'changeBreadCrumb',
    },
    mounted() {
      this.changeBreadCrumb();
    },
  };
</script>
<style lang="scss" scoped>
  .crumb {
    padding: 0;
    margin: 0;
    list-style: none;
    display: inline-block;
  }
  .crumb  li {
    display: inline-block;
  }
  .crumb > li .arrow-right:before{
    display: inline-block;
    content: "/\A0";
    padding: 0 5px;
    color: #ccc;
  }
  .crumb-last-item {
    cursor: default;
    text-decoration: none;
  }
</style>
# vue-crumbs
[![Version](https://img.shields.io/npm/v/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs) [![License](https://img.shields.io/npm/l/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs) [![Downloads](https://img.shields.io/npm/dt/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs)

a simple and useful breadcrumbs for Vue2.js


## Features

- Supports the vue-router 2.x.x
- Supports params routes
- Supports latest Firefox, Chrome, Safari, Opera and IE9+
- Compact size 2KB (1KB gzipped)

## Installation

### NPM

```
$ npm install vue-crumbs --save
```

### Bower

```
$ bower install vue-crumbs
```

### Crumbs Attributes（组件属性）

| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|--------------------|--------------|
| mode    | 面包屑模式，可选值为`name` `url` `mix`;`name`按照router命名模式配置面包屑，支持params路由，`url`自定义路由配置面包屑(之前的实现方式），`mix`混合模式，但是（一条完整的路径必须完整按`name` 或者`url`模式中的一个来配置，不能交叉配置）  | String | mix    |
| rightIcon | 间隔Icon | String | rightIcon   |

### Routes Meta BreadCrumb Attributes （breadcrumb面包屑配置属性）
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|--------------------|--------------|
| icon | 面包屑名称图标 | String | 无   |
| url  | 自定义URL（适用于`url`,`mix`模式） | String | 无  |
| name | 面包屑名称  | String | 无   |
| hidden | 是否隐藏  | Boolean | false   |


### How To Use

```

Import:
import Vue from 'vue'
import VueCrumbs from 'vue-crumbs'
Vue.use(VueCrumbs)

Component Use:
<breadcrumb rightIcon="fa fa-xxx" mode="mix"></breadcrumb>

Routes Config:
just like the Example below
```


### Example That Use In vue-cli

routes.js:

url mode config

```
const routes = {
  routes:[{
    path:'/',
    component:page,
    meta:{
    breadcrumb:[{
      hidden:true, //if hidden is true ,current page breadcrumbs will be hidden
      url:'/',
      icon: '',
      name: 'Home Page'
    }]
    },
    children:[{
      path:'admin',
      component:admin,
      meta:{
        parent:'/',
        breadcrumb:[{
          url: '/admin',
          icon: '',
          name: 'admin page'
        }]
      }
    }]
  },{
    path:'/foo',
    component:foo,
     // if it is a query or param route
    beforeEnter: (to, from, next) => {
      to && (to.meta.breadcrumb[0].url = to.fullPath);
      window.sessionStorage.setItem('foo',to.fullPath);
      next();
    },
    meta:{
      parent:'/',
      breadcrumb:[{
        url: window.sessionStorage.getItem('foo'),
        name: 'foo Page'
      }]
    }
  },{
    path:'/foo/detail',
    component: detail,
    meta:{
      parent:'/foo',
      breadcrumb:[{
        url: '/foo/detail',
        icon: '',
        name: 'detail Page'
      }]
    }
  },{
    path:'/bar',
    component:bar,
    meta:{
      parent: '/',
      breadcrumb:[{
        name: 'bar page' //if no url,it will get current page url as <router-link> path
      }]
    }
  }]
 };
export default routes;

```
name mode config(support params routes)

```
URL: /admin/:pid/:cid

const routes = {
  routes:[{
    path:'/',
    component:page,
    name: 'home'
    meta:{
	    breadcrumb:{
	    	icon: '',
	    	hidden: true,
	     	name: 'Home Page'
	    }
    },
    children:[{
      path:'admin/:pid',
      component:admin,
      name: 'admin',
      meta:{
        parent:'home',
        breadcrumb:{
        	icon: '',
         	name: 'admin page'
        }
      }
    },{
    	path: 'admin/:pid/:cid',
    	component: child,
    	name: 'child',
    	meta: {
    		parent: 'admin',
    		breadcrumb: {
    			icon: '',
    			name: 'child page'
    		}
    	}
    }]
  },
  ]}

```

mix mode config:

```
URL: 
-  /admin/:pid/:cid => name mode
-  /foo/detail => url mode
const routes = {
  routes:[{
    path:'/',
    component:page,
    name: 'home'
    meta:{
    breadcrumb:{
    	icon: '',
    	hidden: true,
     	name: 'Home Page'
    }
    },
    children:[{
      path:'admin/:pid',
      component:admin,
      name: 'admin',
      meta:{
        parent:'home',
        breadcrumb:{
        	icon: '',
         	name: 'admin page'
        }
      }
    },{
    	path: 'admin/:pid/:cid',
    	component: child,
    	name: 'child',
    	meta: {
    		parent: 'admin',
    		breadcrumb: {
    			icon: '',
    			name: 'child page'
    		}
    	}
    }]
  },{
    path:'/foo',
    component:foo,
	 meta:{
      parent:'/',
      breadcrumb:[{
        url: '/foo',
        name: 'foo Page'
      }]
    }
  },{
    path:'/foo/detail',
    component: detail,
    meta:{
      parent:'/foo',
      breadcrumb:[{
        url: '/foo/detail',
        icon: '',
        name: 'detail Page'
      }]
    }
  },
  ]}

```



main.js:

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCrumbs from 'vue-crumbs'
import routes from './routes'
import App from './App'

Vue.use(VueRouter)
Vue.use(VueCrumbs)
const router = new VueRouter(routes)

const vm = new Vue({
  router,
  template: '<App/>',
  components: {
    App
  }
})
```

App.vue:

```
<template>
  <div id="app">
    <breadcrumb></breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
<style>
</style>
```

## Contribution

Welcome to report issue and fork it

## License

[MIT](http://opensource.org/licenses/MIT)

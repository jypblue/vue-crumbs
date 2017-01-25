# vue-crumbs
[![Version](https://img.shields.io/npm/v/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs) [![License](https://img.shields.io/npm/l/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs) [![Downloads](https://img.shields.io/npm/dt/vue-crumbs.svg)](https://www.npmjs.com/package/vue-crumbs)

a simple and useful breadcrumbs for Vue2.js


## Features

- Supports the vue-router 2.x.x

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

## Example
```js
 new VueRouter({
 	routes:[{
 		path:'/',
 		component:page,
 		meta:{
 			breadcrumb:[{
 				hidden:true, //if hidden is true ,current page breadcrumbs will be hidden
 				url:'/',
 				name: 'Home Page'
 			}]
 		},
 		children:[{
 			path:'admin',
 			component:admin,
 			meta:{
 				parent:'/',
 				breadcrumbs:[{
 					url: '/admin',
 					name: 'admin page'
 				}]
 			}
 		}]
 	},{
 		path:'/foo',
 		component:foo,
 		meta:{
 			parent:'/',
 			breadcrumb:[{
				url:'/foo',
 				name: 'foo Page'
 			}]
 		}
 	},{
 		path:'/foo/detail',
 		component: detail,
 		meta:{
 			parent:'/foo',
 			breadcrumb:[{
				url:'/foo/detail', 
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
 })

```

## Contribution

If you find a bug or want to change the code, you can fork it

## License

[MIT](http://opensource.org/licenses/MIT)

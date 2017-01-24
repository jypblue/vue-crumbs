<template>
	<div class="breadcrumbs" v-if="crumbs.length">
		<ul>
				<li v-for="(crumb ,i) in crumbs">
					<router-link v-if="i < crumbs.length - 1" :to="{ path:crumb.url}">{{ crumb.name }} <i class="icon-right"></i></router-link>
					<a v-else>{{crumb.name}}</a>
				</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'crumbs',
    props:['crumbs']
	}
</script>
<style scoped>
	/*可以编写默认样式*/
</style>
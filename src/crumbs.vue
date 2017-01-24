<template>
	<div class="breadcrumbs" v-if="$crumbs.length">
		<ul>
				<li v-for="(crumb ,i) in $crumbs">
					<router-link v-if="i < $crumbs.length - 1" :to="{ path:crumb.url}">{{crumb.name}}</router-link>
					<router-link>{{crumb.name}}</router-link>				
				</li>
		</ul>		
	</div>
</template>
<script>
	export default {
		name: 'crumbs',
		props: '$crumbs'
	}
</script>
<style scoped>
	
</style>
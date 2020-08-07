<template>
	<v-app dark>
		<Header />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Header from "./layout/partials/Header";

export default {
	name: "App",
	components: {
		Header,
	},
};
</script>
<style lang="sass">
a
    font-weight: bold
    color: #2c3e50
    text-decoration: none

#nav
    &.router-link-exact-active #btn
      color: #42b983
      pointer-events: none
</style>

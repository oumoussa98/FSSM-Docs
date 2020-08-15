<template>
	<v-app dark>
		<Header />
		<v-main>
			<transition name="fade">
				<router-view />
			</transition>
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
	watch: {
		$route(to) {
			document.title = to.meta.title;
		},
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
.fade-enter-active
  transition: all 0.6s
.fade-enter
  opacity: 0
</style>

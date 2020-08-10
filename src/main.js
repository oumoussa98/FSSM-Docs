import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/storage"

Vue.component(
	'ContentDisplayer', () => import('@/components/templates/ContentDisplayer')
)

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: (h) => h(App),
	created() {
		firebase.initializeApp({
			apiKey: "AIzaSyBpjbXVMUKHx77navIKO8IChlql94oFJmQ",
			authDomain: "fssm-fb8e7.firebaseapp.com",
			databaseURL: "https://fssm-fb8e7.firebaseio.com",
			projectId: "fssm-fb8e7",
			storageBucket: "fssm-fb8e7.appspot.com",
		});
	},
}).$mount("#app");

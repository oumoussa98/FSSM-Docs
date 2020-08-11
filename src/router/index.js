import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/404.vue'





Vue.use(VueRouter)

  const routes = [
		{
			path: "/",
			name: "Home",
			component: Home,
			meta: {
				title: "Home Page",
			},
		},
		{
			path: "/upload",
			name: "Upload",
			component: Upload,
			meta: {
				title: "Files Upload",
			},
		},
		{
			path: "/contact",
			name: "Contact",
			component: Contact,
			meta: {
				title: "Contact",
			},
		},
		{
			path: "/about",
			name: "About",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "../views/About.vue"),
			meta: {
				title: "About",
			},
		},
  ];
//Licence fondamental SMP routes
for (let i = 1; i < 7; i++) {
  let obj = {};
  obj.path = "/licence-fondamental/smp/s"+i;
  obj.name = "smps" + i;
  obj.component = () => import('../components/licence-fondamental/SMP/S' + i);
  obj.meta = {};
  obj.meta.title = "licence-fondamental-SMP-S" + i;
  routes.push(obj);
}


// catch 404 not found 
const obj = {
	path: "*",
	name: "404",
	component: NotFound,
	meta: {
		title: "404 Not Found",
	},
};
routes.push(obj);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Contact from '../views/Contact.vue'




Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
     {
       path: '/contact',
       name: 'Contact',
       component: Contact
     },
    
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  ]
//Licence fondamental SMP routes
for (let i = 1; i < 7; i++) {
  let obj = {};
  obj.path = "/licence-fondamental/smp/s"+i;
  obj.name = "smps"+i;
  obj.component = () => import('../components/licence-fondamental/SMP/S'+i)
  routes.push(obj);
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

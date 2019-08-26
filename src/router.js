import Vue from 'vue'
import Router from 'vue-router'
import {store} from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
    ,
    {
      path: '/login',
      name: 'login',
      meta:{
        isPublic:true
      },
      component: () => import('./views/Login.vue')
    },
    {
      path:'/admin/users',
      name:'adminUsers',
      meta:{
        isPublic:false,
      },
      component: () => import('./views/admin/Users.vue')
    },
    {
      path:'/admin/ejercicios',
      name:'adminEjercicios',
      meta:{
        isPublic:false,
      },
      component: () => import('./views/admin/Ejercicios.vue')
    },
    {
      path:'/admin/ejercicio/nuevo',
      name:'adminEjerciciosNuevo',
      meta:{
        isPublic:false,
      },
      component: () => import('./views/admin/EjercicioNuevo.vue')
    }
     
  ]
})

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic){
    if(!store.state.user.token){
      next('/login')
    }else{
      next()
    }
  }
  else
  {
    next()
  }
})

export default router
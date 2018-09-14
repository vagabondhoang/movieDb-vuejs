import Vue from 'vue'
import Router from 'vue-router'
import FilmList from '@/components/FilmList'
import FilmDetail from '@/components/FilmDetail'
import NotFound from '@/pages/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FilmList',
      component: FilmList
    },
    {
      path: '/search/:query',
      name: 'PageSearch',
      component: FilmList
    },
    {
      path: '/film/:id',
      name: 'FilmDetail',
      component: FilmDetail,
      props: true
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})

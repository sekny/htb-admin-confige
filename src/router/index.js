import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName, loadingConfig } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

iView.LoadingBar.config({
  ...loadingConfig
})

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // have permission to access
  else next({ replace: true, name: 'error_401' }) // No permission, redirect to 401 page
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // Not logged in and the page to jump to is not the login page
    next({
      name: LOGIN_PAGE_NAME // Jump to login page
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // The page that is not logged in and to jump to is the login page
    next() // jump
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // The page you are logged in and you want to jump to is the login page
    next({
      name: homeName // Jump to homeName page
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // Pull the user information, and judge whether there is permission to access by the user permissions and the name of the page to which the jump is made; access must be an array, such as: ['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

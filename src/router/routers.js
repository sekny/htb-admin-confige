import Main from '@/components/main'

/**
 * iview-admin Configurable parameters in meta in addition to native parameters:
 * meta: {
 *  title: { String|Number|Function }
 *         Text to display in the sidebar, breadcrumbs, and tab bar
 *         Use the '{{ multilingual field }}' form to use in combination with multiple languages. For example, see the routing configuration of multiple languages;
 *         You can pass in a callback function, the parameter is the current routing object, for example, see dynamic routing and routing with parameters
 *  hideInBread: (false) After setting to true, this level of routing will not appear in the breadcrumbs. For example, see QQ group routing configuration
 *  hideInMenu: (false) After setting to true, the page option will not be displayed in the left menu
 *  notCache: (false) After setting to true, the page will not be cached after switching tabs. If you need to cache, you do not need to set this field, and you need to set the page component name attribute to be consistent with the name of the routing configuration.
 *  access: (null) An array of permissions that can access the page, the permissions set by the current route will affect the sub-routes
 *  icon: (-) The icon displayed on the left menu, breadcrumbs and tab navigation on this page. If it is a custom icon, you need to add an underscore '_' before the icon name
 *  beforeCloseName: (-) If this field is set, when the current tab page is closed, the method corresponding to the field name will be found in '@/router/before-close.js' as the hook function before closing.
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - ABC',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'Home',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'viewDetail/:id',
        name: 'viewDetail',
        meta: {
          icon: 'md-flower',
          title: route => `${route.query.title}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/view-detail.vue')
      }
    ]
  },
  {
    path: '/administration',
    name: 'Service Config',
    meta: {
      icon: 'ios-construct-outline',
      title: 'Service Config'
    },
    component: Main,
    children: [
      {
        path: 'service-module',
        name: 'Module',
        meta: {
          icon: 'ios-construct-outline',
          title: 'Module',
          requiresAuth: true,
          notCache: false
        },
        component: () => import(/* webpackChunkName: "server-config" */ '@/view/administration/server-config.vue')
      },
      {
        path: 'service-group',
        name: 'Group',
        meta: {
          icon: 'ios-settings-outline',
          title: 'Group Meta'
        },
        component: () => import('@/view/administration/role.vue')
      }
    ]
  },
  {
    path: '/user-management',
    name: 'User Management',
    meta: {
      icon: 'ios-lock-outline',
      title: 'User Management'
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'User',
        meta: {
          icon: 'ios-contacts-outline',
          title: 'User'
        },
        component: () => import('@/view/user-management/user/user.vue')
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          icon: 'ios-unlock-outline',
          title: 'Role'
        },
        component: () => import('@/view/user-management/role/role.vue')
      },
      {
        path: 'permission',
        name: 'Permission',
        meta: {
          icon: 'ios-settings-outline',
          title: 'Permission'
        },
        component: () => import('@/view/user-management/permission/permission.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import importFilter from '@/filter'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
// Mock should not be introduced in prd
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description Register admin built-in plugin
 */
installPlugin(Vue)
/**
 * @description Production environment shutdown prompt
 */
Vue.config.productionTip = false
/**
 * @description Global registration application configuration
 */
Vue.prototype.$config = config
/**
 * registration instruction
 */
importDirective(Vue)
/**
 * registration instruction
 */
importFilter(Vue)
Vue.directive('clickOutside', clickOutside)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  // mounted() {
  //   this._keyListener = function(e) {
  //     if ((e.ctrlKey || e.metaKey)){
  //       e.preventDefault(); // present "Save Page" from getting triggered.
  //       if (e.key === "s" || e.key === "S"){
  //         // TODO save by hook back to method save in current screen
  //         console.log('TODO save by hook back to method save in current screen')
  //         this.$Notice.open({
  //           title: 'Save',
  //           desc: 'Ctrl + s => TODO save by hook back to method save in current screen.',
  //           duration: 0
  //         });
  //       }
  //       else if (e.key === "/") {
  //         // TODO Search
  //         console.log('TODO Search')
  //         this.$Notice.open({
  //           title: 'Search title',
  //           desc: 'Ctrl + / => TODO Search.',
  //           duration: 0
  //         });
  //       }
  //       else if (e.key === 'ArrowRight') {
  //         // TODO back to previous page
  //         console.log('TODO back to previous page')
  //         this.$Notice.open({
  //           title: 'Go to previous page title',
  //           desc: 'Ctrl + ArrowRight => TODO back to previous page.',
  //           duration: 0
  //         });
  //       }
  //       else if (e.key === 'ArrowLeft') {
  //         // TODO move to next page
  //         console.log('TODO move to next page')
  //         this.$Notice.open({
  //           title: 'Go to next page title',
  //           desc: 'Ctrl + ArrowLeft => move to next page.',
  //           duration: 0
  //         });
  //       }
  //     }
  //   };

  //   document.addEventListener('keydown', this._keyListener.bind(this));
  // },
  // beforeDestroy() {
  //   document.removeEventListener('keydown', this._keyListener);
  // }
})

Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
  }  
})
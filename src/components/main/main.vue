<template>
  <Layout style="height: 100%" class="main">
    <!-- default width:  256 -->
    <Sider hide-trigger collapsible :width="230" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- Content that needs to be placed on the menu, such as Logo，Written inside the side-menu tag, as follows -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
          <!-- <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/> -->
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
      <Footer class="layout-footer-center" style="padding: 10px 20px;">
        &copy; {{ new Date().getFullYear() }}, made with &#129293; by <a href="https://www.hatthabank.com/" target="_blank">Hattha Bank</a>, All rights reserved.
      </Footer>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/htb-logo-min.png'
import maxLogo from '@/assets/images/htb-logo-no-text.png'
import defaultAvata from '@/assets/images/default-avata.png'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      return defaultAvata
    },
    cacheList () {
      const list = [...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    abc () {
      console.log('Hell')
    },
    keyListener (e) {
      if ((e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        if (e.key === "s" || e.key === "S") {
          // TODO save by hook back to method save in current screen
          console.log('TODO save by hook back to method save in current screen')
          this.$Notice.open({
            title: 'Save',
            desc: 'Ctrl + s => TODO save by hook back to method save in current screen.',
            duration: 0
          })
        } else if (e.key === "/") {
          // TODO Search
          console.log('TODO Search')
          this.abc()
          this.$Notice.open({
            title: 'Search title',
            desc: 'Ctrl + / => TODO Search.',
            duration: 0
          })
        } else if (e.key === 'ArrowRight') {
          // TODO back to previous page
          console.log('TODO back to previous page')
          this.$Notice.open({
            title: 'Go to previous page title',
            desc: 'Ctrl + ArrowRight => TODO back to previous page.',
            duration: 0
          })
        } else if (e.key === 'ArrowLeft') {
          // TODO move to next page
          console.log('TODO move to next page')
          this.$Notice.open({
            title: 'Go to next page title',
            desc: 'Ctrl + ArrowLeft => move to next page.',
            duration: 0
          })
        }
      }
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      console.log(this.$route)
      console.log(newRoute)
      console.log(this.tagNavList)
      console.log(getNewTagList(this.tagNavList, newRoute))
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description Initialize breadcrumbs and tabs
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // Set initial language
    this.setLocal(this.$i18n.locale)
    // If the currently open page is not in the tab bar, jump to the homeName page
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // Get the number of unread messages
    // this.getUnreadMessageCount()

    document.addEventListener('keydown', this.keyListener.bind(this))
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keyListener)
  }
}
</script>
<style lang="less" scope>
  .content-wrapper {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px' width='220px'><text x='0' y='50' fill='gainsboro' font-size='56'>Welcome</text></svg>");
    background-repeat: no-repeat;
    background-position: center;
  }

</style>

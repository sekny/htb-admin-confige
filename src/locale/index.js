import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import customEnUs from './lang/en-US'
import enUsLocale from 'iview/src/locale/lang/en-US'

Vue.use(VueI18n)

// Automatically set language according to browser system language
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+ writing
Vue.locale = () => {}
const messages = {
  'en-US': Object.assign(enUsLocale, customEnUs)
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n

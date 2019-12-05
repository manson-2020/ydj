import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(Vuex)
const store = require('./store').default
Vue.prototype.$store = store
App.mpType = 'app'
Vue.prototype.$api = "http://ydj.shdong.cn"
const app = new Vue({
    ...App
})
app.$mount()

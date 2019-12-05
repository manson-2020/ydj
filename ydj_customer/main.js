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
	...App,

})
// Vue.prototype.checkLogin = function(backpage, backtype){
// 	var SUID  = uni.getStorageSync('token');
// 	if(SUID == '' ){
// 		uni.redirectTo({url:'./pages/login/login?backpage='+backpage+'&backtype='+backtype});
// 		return false;
// 	}
// 	return [SUID, SRAND, SNAME, SFACE];
// }
app.$mount()

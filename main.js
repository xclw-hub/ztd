import Vue from 'vue'
import App from './App'
import { request } from 'util/request.js'
import store from './store'

Vue.prototype.$request=request

Vue.prototype.$store = store

Vue.config.productionTip = false
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

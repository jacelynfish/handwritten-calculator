// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import router from './router'

Vue.config.productionTip = false
Vue.use(iView);
var eventHub = new Vue();
Vue.mixin({
  data: function() {
    return {
      eventHub
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  template: '<App/>',
  components: { App }
})

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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  mixin: {
    data: function () {
        return {
            eventHub: new Vue()
        }
    }
  },
  // router,
  template: '<App/>',
  components: { App }
})

// todo: remove, currently not used in runtime

import "../../common/system-ca"
import "./assets/css/app.scss"
import { PromiseIpc } from 'electron-promise-ipc'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'

const promiseIpc = new PromiseIpc({maxTimeoutMs: 6000});

promiseIpc.on('navigate', async (view) => {
  router.push(view).catch(err => {})
});

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.mixin({
  created: function () {
    this.$promiseIpc = promiseIpc;
  }
})

setTimeout(async () => {
  await store.dispatch('init')
  new Vue({
    components: {App},
    store,
    router,
    template: '<App/>'
  }).$mount('#app')
})
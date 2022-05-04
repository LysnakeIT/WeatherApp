import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'flag-icons';

createApp(App).use(router).mount('#app');

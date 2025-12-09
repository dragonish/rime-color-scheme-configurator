import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import i18n from '@/locales';
import App from './App.vue';
import './variables.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const pinia = createPinia();

const myApp = createApp(App);
myApp.use(pinia);
myApp.use(i18n);
myApp.use(Quasar, {
  lang: quasarLang,
  plugins: {
    Notify,
  },
});

myApp.mount('#app');

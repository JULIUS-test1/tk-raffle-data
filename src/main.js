import { createApp } from 'vue';
import './style.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import router from './router';

import App from './App.vue';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount('#app');
  }
});

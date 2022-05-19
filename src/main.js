import { createApp } from 'vue'
import App from './App.vue'
import gAuthPlugin from 'vue3-google-oauth2';

const app = createApp(App)
let gauthClientId = "712407789741-m2f1g999bvqth0t7gbfv4b49qvgutdf2.apps.googleusercontent.com";

const gauthOption = {
    clientId: gauthClientId,
    scope: 'profile email',
    prompt: 'select_account',
    plugin_name: 'chat'
};
  
app.use(gAuthPlugin, gauthOption)

app.mount('#app')

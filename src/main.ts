import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { vantPlugins } from "./plugins/vantImport";
import "@/assets/css/reset.css";

createApp(App)
    .use(store)
    .use(router)
    .use(vantPlugins)
    .mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./auth-store";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.autoLogin();

app.mount("#app");

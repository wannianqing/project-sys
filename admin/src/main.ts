import { createApp } from "vue";
import App from "./App.vue";
import { useAllPlugins } from "@/plugins";

import { useMiddleware } from "./router/middleware";
import router from "./router";
import mitt from "mitt";
const emitter = mitt();

useMiddleware(router);

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
useAllPlugins(app);
app.mount("#app");

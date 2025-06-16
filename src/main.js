import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue/es";

createApp(App).use(store).use(router).use(Antd).mount("#app");

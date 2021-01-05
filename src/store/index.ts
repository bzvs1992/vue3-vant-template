import { createStore } from "vuex";
import user from "./modules/user/index";
import createPersistedState from "vuex-persistedstate";
const dataStore = createPersistedState({
    key: "radar"
});

export default createStore({
    modules: {
        user
    },
    plugins: [dataStore]
});

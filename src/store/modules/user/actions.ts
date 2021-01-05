import { ActionContext, ActionTree } from "vuex";
import { UserState } from "./index.d";
import { RootState } from "@/store/index.d";
import * as TYPES from "./types";

const actions: ActionTree<UserState, RootState> = {
    /**
     * 初始化本地数据一系列操作
     */
    async INIT({ commit }: ActionContext<UserState, any>) {
        // 这里初始化本地数据
        console.log("INIT");
        commit(TYPES.INIT, "log");
    },
    /**
     * 退出登录一系列操作
     */
    async EXIT() {
        // 这里清除本地数据
    }
};
export default actions;

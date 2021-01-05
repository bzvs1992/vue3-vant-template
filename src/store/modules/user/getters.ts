import { GetterTree } from "vuex";
import { RootState } from "@/store/index.d";
import { UserState } from "./index.d";
const getters: GetterTree<UserState, RootState> = {
    token({ user }: UserState) {
        return user.token;
    }
};
export default getters;

/**
 * 需要用到的组件在此全局引入一次即可在组件中使用
 * 不需要组件中再单独引入
 */
import { App as VM } from "vue";
import {
    Button,
    List,
    Cell,
    Tabbar,
    TabbarItem,
    Icon,
    NavBar,
    Field,
    ActionSheet,
    Uploader
} from "vant";

const plugins = [
    Button,
    List,
    Cell,
    Tabbar,
    TabbarItem,
    Icon,
    NavBar,
    Field,
    ActionSheet,
    Uploader
];

export const vantPlugins = {
    install: function(vm: VM) {
        plugins.forEach(item => {
            vm.component(item.name, item);
        });
    }
};

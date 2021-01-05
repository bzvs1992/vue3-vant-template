<template>
    <div class="container">
        <!-- 使用keepAlive优化, 这里写法不同于2.x版本 -->
        <router-view class="view" v-slot="{ Component }">
            <keep-alive :include="url">
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <van-tabbar
            class="tab"
            v-model="index"
            :placeholder="true"
            :border="false"
            route
        >
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/intro">介绍</van-tabbar-item>
            <van-tabbar-item to="/publish">
                <van-icon
                    class="publish"
                    size="44"
                    name="add"
                    color="#1989fa"
                />
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/discover">发现</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/mine">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "tabbar",
    setup() {
        const index = ref(0);
        const url = ["/home", "/intro", "/discover", "/mine"];
        return {
            index,
            url
        };
    }
});
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    .view {
        flex: 1;
        background-color: red;
    }
    .tab {
        flex: none;
        width: 100vw;
        .publish {
            background-color: #fff;
            transform: translateY(-50%);
            border-radius: 50%;
        }
    }
}
</style>

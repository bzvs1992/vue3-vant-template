<template>
    <div class="home">
        <img class="logo" alt="Vue logo" src="@/assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App1" />
        <van-button round type="primary">圆形按钮</van-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@com/HelloWorld.vue"; // @ is an alias to /src
export default defineComponent({
    name: "Home",
    components: {
        HelloWorld
    }
});
</script>
<style lang="less" scoped>
.logo {
    width: 375px;
}
</style>

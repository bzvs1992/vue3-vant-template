<template>
    <router-view />
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const store = useStore();
        onBeforeMount(() => {
            store.dispatch("user/INIT");
        });
        return {};
    }
});
</script>

<template>
    <div>
        <h1>{{ store.doubleCount }}</h1>
        <button type="button" @click="increase"></button>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
export default {
    setup() {
        const store = useCounterStore()
    },
    methods: {
        increase() {
            store.increment();
        }
    },

}
</script>

<style scoped></style>
<template>
    <div class="container-component">
        <h2>{{ container.name }}</h2>
        <span>{{ container.url }}</span>
        <span>{{ container.position }}</span>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import store from 'vuex';

export default {
    name: "Container",
    props: ['container'],
    data() {
        return {}
    },
    methods: {
    },
}
</script>

<style scoped>

</style>
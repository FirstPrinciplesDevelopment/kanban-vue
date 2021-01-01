<template>
    <div v-if="container">
        <div class="container-component">
            <h2>{{ container.name }}</h2>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script>
// import store from 'vuex';
import Card from '@/components/Card.vue'


export default {
    name: "Container",
    props: ['containerProp'],
    computed: {
        container() {
            return this.$store.getters.getContainerById(this.containerProp.id);
        }
    },
    methods: {
    },
    components: {
        Card
    },
}
</script>

<style scoped>
    .container-component {
        padding: 1em;
        margin: 1em;
        border-radius: 7px;
        color: #3389fa;
        background-color: #0d1117;
        border: 1px solid;
        border-color: #fff;
    }
</style>
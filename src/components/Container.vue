<template>
    <div class="container-component">
        <h2>{{ container.name }}</h2>
        <!-- <div>{{ container.url }}</div>
        <div>{{ container.position }}</div> -->
        <div v-for="card in container.cards" v-bind:key="card.url">
            <Card :card="card"/>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import store from 'vuex';
import Card from '@/components/Card.vue'


export default {
    name: "Container",
    props: ['container', 'board_id'],
    data() {
        return {}
    },
    methods: {
    },
    components: {
        Card
    },
    created() {
        console.log("Loading Cards...");
        this.$store.dispatch('loadCardsAsync', {board_id: this.board_id, container_id: this.container.id});
        console.log("Done loading Cards");
    }
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
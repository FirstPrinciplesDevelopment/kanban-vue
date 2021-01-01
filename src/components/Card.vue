<template>
    <div v-if="card">
        <div class="card-component">
            <div class="card-header">{{ card.name }}</div>
            <div>id: {{ card.id }}</div>
            <div>position: {{ card.position }}</div>
            <div>{{ card.content }}</div>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
    name: 'Card',
    props: ['cardProp'],
    computed: {
        card() {
            return this.$store.getters.getCardById(this.cardProp.id);
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .card-component {
        padding: 1em;
        margin: 1em;
        border-radius: 7px;
        color: #c0d4ee;
        background-color: #5b7bcc;
        box-shadow: 5px 7px 5px #000;
    }
    .card-header {
        font-weight: 700;
        font-size: 20px;
    }
</style>
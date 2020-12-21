<template>
    <div class="card-component">
        <h4>{{ card.name }}</h4>
        <!-- <div>{{ card.id }}</div> -->
        <div>{{ card.content }}</div>
    </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
    name: "Card",
    props: ['card'],
    data() {
        return {}
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
        background-color: #303366;
        box-shadow: 5px 7px 5px #000;
    }
</style>
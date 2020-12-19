<template>
    <div class="create-board">
        <input type="text" v-model="board.name" placeholder="name" />
        <input type="text" v-model="board.slug" placeholder="slug" />
        <input type="number" step="1" v-model="board.position" />
        <button class="btn btn-primary" v-on:click="createBoardAsync(board)">Create</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "CreateBoard",
    data() {
        return {
            board: {
                name: '',
                slug: '',
                position: 0,
                changed_by: null,
                archived: false,
                archived_by: null,
                archived_time: null
            }
        }
    },
    methods: {
        ...mapActions([
            'createBoardAsync'
        ])
    }
}
</script>
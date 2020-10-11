<template>
    <div class="field">
        <textarea class="diagnose-text" v-model="userData.diagnose" @click="$emit('clear', $event.target)" cols="30" rows="5"></textarea>
        <Helper @add-input="add" class="helper" v-bind:list="diagnose"/>
    </div>
</template>

<script>
import Helper from '../components/Helper'
export default {
    props: ['diagnose', 'userData'],
    components: {
        Helper
    },
    methods: {
        add(value) {
            document.querySelector(`textarea`).value += value + ' '
            document.querySelector(`textarea`).dispatchEvent(new Event('input'))
        }
    }
}
</script>

<style lang="scss" scoped>
.helper {
    position: absolute;
    bottom: 0;
    right: -220px;
    display: none;
    z-index: 5;
    width: 300px;
    max-height: 400px;
    overflow-y: scroll;
}

textarea {   
    resize: none;
    width: 100%; 
    padding: 5px;
    font-size: 16px;

    &.focus {
        border-color: #000;
    }
}

textarea.focus + .helper {
    display: block;
    right: -300px;
}

.field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 700px;
    margin-bottom: 10px;
}
</style>
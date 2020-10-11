<template>
    <div class="field">
        <label :for="sign.name"> {{sign.title}}: </label>
        <input class="input" type="text" :id="sign.name + place" :data-place="place" 
                v-model="userData[sign.name]"
                @click="$emit('clear', $event.target)"
                autocomplete="off"
                value="">
        <Helper @add-input="add" class="helper" v-bind:list="sign.description"/>
    </div>
</template>

<script>
import Helper from '../components/Helper'
export default {
    props: ['sign', 'userData', 'place'],
    data() {
        return {
            userDescription: ''
        }
    },
    components: {
        Helper
    },
    methods: {
        add(value) {
            const input = document.querySelector(`input[id="${this.sign.name + this.place}"]`)
            input.value += value + ' '
            input.dispatchEvent(new Event('input'))
        }
    }
}
</script>

<style lang="scss" scoped>
.helper {
    position: absolute;
    top: 50%;
    right: -220px;
    display: none;
    transform: translateY(-50%);
    z-index: 5;
}

input {    
    width: 400px;
    padding: 5px;
    font-size: 14px;

    &.focus {
        border-color: #000;
    }
}

input.focus + .helper {
    display: block;
}

.field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

label {
    text-align: left;
}
</style>
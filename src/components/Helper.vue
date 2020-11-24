<template>
    <ul>
        <li class="helper-item" v-for="item in list" :key="item.id" @click="$emit('add-input', item)"> {{item}} </li>
    </ul>
</template>

<script>
export default {
    props: ['list']
}
</script>

<style lang="scss" scoped>
ul {    
    position: relative;
    padding: 10px;    
    width: 200px;
    display: flex;
    flex-direction: column;
    text-align: left;

    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    list-style: none;
    border-radius: 10px;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -29px;
        width: 0px;
        height: 0px;
        border: 15px solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        transform: translateY(-50%) rotate(90deg);
    }
}
li {
    padding: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: rgb(43, 113, 194);
    }
}
</style>
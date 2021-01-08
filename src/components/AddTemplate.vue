<template>
    <form class="add-template" @submit.prevent="$emit('add-template', templateName)">
        <button class="add-template__close" @click="$emit('close-popup')"></button>
        <h2 class="add-template__title title">Добавить шаблон</h2>

        <div class="add-template__input form__field">
            <input id="template-name" type="text" v-model="templateName" placeholder="Название шаблона" required>
        </div>

        <button type="submit" class="add-template__button button">Добавить</button>
        
    </form>
</template>

<script>
export default {
    data() {
        return {
            templateName: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.add-template {
    width: 400px;
    position: fixed;
    padding: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    color: inherit;
}

.add-template__title {
    margin: 0;
}

.add-template__button {
    margin-top: 40px;
}

.add-template__input {
    margin-top: 40px;
}

.add-template__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &::after,
    &::before {
        position: absolute;
        content: "";
        top: 10px;
        left: -5px;
        width: 35px;
        height: 3px;
        background-color: #0A67A3;
    }

    &::after {
        transform: rotate(45deg);
    }

    &::before {
        transform: rotate(-45deg);
    }
}
</style>
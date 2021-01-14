<template>
    <div class="templates">
        <h3 class="templates__title">Мои шаблоны</h3>
        <p v-if="!templates.length">Шаблонов нет</p>
        <ul v-if="templates.length" class="templates__list">
            <li class="templates__item" v-for="template in templates" :key="template"> 
                <span @click="$emit('set-template', template)">{{ templates.indexOf(template) + 1 }}.  {{ template.name }}</span>
                <button class="templates__delete" @click="$emit('delete-template', template)"></button>
            </li>             
        </ul>
    </div>
</template>

<script>
export default {
    props: ['templates']
}
</script>

<style lang="scss" scoped>
.templates {
    width: 240px;
    padding: 20px;
    border: 3px solid #D4E9F7;
    text-align: left;
    height: 60%;    
    background-color: #ffffff; 
}

.templates p {
    margin-top: 40px;
    opacity: 0.5;
}

.templates__title {
    position: relative;
    font-family: inherit;
    font-weight: normal;
    font-size: 20px;

    &::after {
        position: absolute;
        content: "";
        bottom: -15px;
        left: 0;
        height: 3px;
        width: 80px;
        background-color: #656F75;
    }
}

.templates__list {
    margin-top: 40px; 
}

.templates__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    margin-right: 40px;
    font-size: 14px;

    & span:hover {
        text-decoration: underline;
    }
}

.templates__delete {
    position: absolute;
    top: 5px;
    right: -40px;
    width: 20px;
    height: 20px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.6;

    &::after,
    &::before {
        position: absolute;
        content: "";
        top: 6px;
        left: -5px;
        width: 25px;
        height: 3px;
        background-color: rgb(158, 19, 19);
    }

    &::after {
        transform: rotate(-45deg);
    }

    &::before {
        transform: rotate(45deg);
    }

    &:hover {
        opacity: 1;
    }
}
</style>
<template>
    <div class="item">
        <h3 @click="isShowing = !isShowing"> {{ data.name }} </h3>
        <ul v-if="isShowing">
            <li v-for="pathology in data.pathology"
                :class="pathology.id"
                :key="pathology.name"
                @click="$emit('show', pathology)"> {{ pathology.name }} ({{pathology.images.length}} фото) </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            isShowing: false
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    text-align: left;
    margin-bottom: 10px;
}

h3 {
    background-color: #D4E9F7;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        background-color: #afd5ec;
        transition: 0.3s ease-in-out;
    }
}

ul {
    padding: 10px;
    background-color: #f2f2f2;
}

li {
    padding: 5px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>
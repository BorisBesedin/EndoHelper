<template>
    <div class="item">
        <h3 @click="isShowing = !isShowing"> {{ data.name }} ({{data.pathology.length}}) </h3>
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
    margin-bottom: 20px;
}

h3 {
    background-color: #e5e5e5;
    cursor: pointer;
}

ul {
    margin-top: 10px;
}

li {
    padding: 5px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>
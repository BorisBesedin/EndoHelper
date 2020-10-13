<template>
    <div class="item">
        <h3> {{ data.name }} </h3>
        <ul>
            <li v-for="pathology in data.pathology"
                :key="pathology.name"
                @click="$emit('show', pathology)"> {{ pathology.name }} </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style lang="scss" scoped>
.item {
    text-align: left;
}

h3 {
    background-color: #e5e5e5;
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
<template>
    <div class="">
        <h3> {{ showData.name }} </h3>
        <ul class="images">
            <li v-for="image in showData.images" :key="image.id" :data-text="image.text">
                <img :src="image.url" width="250px" height="250px">
                <span class="images__description"> {{ image.description }} </span>
                <span class="images__author"> {{ image.author }} </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['showData']
}
</script>

<style lang="scss" scoped>
.images {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
}

h3 {
    margin-top: 30px;
    text-align: left;
}

.images__description {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}

.images__author {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.6;
}

@keyframes fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

li {
    position: relative;
    width: 250px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover::after {
        box-sizing: border-box;
        position: absolute;
        content: attr(data-text);
        padding: 10px;
        top: 0;
        right: 0;
        width: 250px;
        height: 250px;
        color: #ffffff;
        text-align: left;
        background-color: rgba($color: #000000, $alpha: 0.7);
        animation: fade 0.3s;
    }
}
</style>
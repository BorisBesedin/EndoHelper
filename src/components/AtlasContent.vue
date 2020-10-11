<template>
    <div class="">
        <h3> {{ showData.name }} </h3>
        <ul class="images">
            <li v-for="image in showData.images" :key="image.id" :data-text="image.text">
                <img :src="image.url" width="250px" height="250px">
                <span> {{ image.description }} </span>
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

span {
    font-size: 14px;
    font-weight: bold;
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
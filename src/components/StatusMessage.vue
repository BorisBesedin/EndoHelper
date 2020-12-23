<template>
    <div class="message">
        <h3> {{message.title}} </h3>
        <p> {{message.text}} </p>
        <button class="button" @click="$emit('close-message')">OK</button>
    </div>
</template>
<script>
export default {
    props: ['message', 'isShowing']
}
</script>
<style lang="scss" scoped>
.message {
    padding: 30px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
}

h3 {
    font-size: 18px;
    color: #000000;
}

p {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 16px;
    color: #000000;
}
</style>
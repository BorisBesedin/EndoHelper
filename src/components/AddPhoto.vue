<template>
    <form class="form" @submit.prevent="$emit('send-photo', userData)" enctype="multipart/form-data">
        <button class="form__close" @click="$emit('close-popup')"></button>
        <p class="form__field">
            <label for="author">Автор:</label>
            <input v-model="userData.author" type="text" id="author" name="author">
        </p>
        <p class="form__field">
            <label for="category">Категория:</label>
            <select v-model="userData.category" name="category" id="category" @change="setPathology">
                <option value="none">Не выбрано</option>
                <option value="esophagus">Пищевод</option>
                <option value="gaster">Желудок</option>
                <option value="colon">Толстая кишка</option>
            </select>
        </p>
        <p class="form__field">
            <label for="pathology">Патология:</label>
            <select v-model="userData.pathology" name="pathology" id="pathology">
                <option value="none">Не выбрано</option>
                <option v-for="pathology in pathologyList" :key="pathology.id" :value="pathology.id"> {{pathology.name}} </option>
            </select>
        </p>

        <p class="form__field">
            <label for="description">Подпись к фото:</label>
            <input v-model="userData.description" type="text" id="description" name="description">
        </p>

        <p class="form__field">
            <label for="text">Описание картины:</label>
            <textarea v-model="userData.text" name="text" id="text" cols="30" rows="4"></textarea>
        </p>

        <p class="form__field">
            <label class="form__file" for="photo">Изображение</label>
            <input class="form__file-input" type="file" name="photo" id="photo" accept="image/*,image/jpeg">
        </p>

        <button type="submit" class="button form__submit">Отправить</button>
    </form>
</template>

<script>
export default {
    props: ['atlas'],
    data() {
        return {   
            pathologyList: [],         
            userData: {
                author: '',
                date: '',
                category: '',
                pathology: '',
                description: '',
                text: ''
            }
        }
    },
    methods: {
        setPathology() {
            const name = document.querySelector('#category').value

            if (name !== 'none') {
                this.pathologyList = this.atlas[name].pathology
            } else {
                this.pathologyList = []
            }            
        }        
    }
    
}
</script>

<style lang="scss" scoped>
.form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    padding: 40px;
    background-color: #ffffff;
    color: #000000;
    border-radius: 10px;
}

.form__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;

    &::after,
    &::before {
        position: absolute;
        content: "";
        top: 10px;
        left: -5px;
        width: 35px;
        height: 3px;
        background-color: green;
    }

    &::after {
        transform: rotate(45deg);
    }

    &::before {
        transform: rotate(-45deg);
    }
}

select, input, textarea {
    padding: 5px;
    font-size: 16px;
    border: 2px solid #000000;
    border-radius: 10px;
}

.form__field {
    width: 100%;
    display: flex;
    flex-direction: column;
}

label {
    align-self: end;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
}

.form__submit {
    margin-top: 40px;
}

.form__file-input {
    border: none;
}

</style>
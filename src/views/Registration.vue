<template>
    <form class="registration form" @submit.prevent="register">
        <h2 class="title">Регистрация</h2>
        <div class="form__wrapper">
            <div class="form__section">
                <p class="form__field required">
                    <label for="name">Ваше имя:</label>
                    <input v-model="userData.name" type="text" id="name" name="name" placeholder="имя полностью" required>
                </p>
                <p class="form__field required">
                    <label for="login">Логин:</label>
                    <input v-model="userData.login" type="text" id="login" name="login" placeholder="логин для входа" required>
                </p>
                <p class="form__field required">
                    <label for="password">Пароль:</label>
                    <input v-model="userData.password" type="password" id="password" name="password" placeholder="пароль" required>
                </p>
                <p class="form__field required">
                    <label for="confirm">Пароль еще раз:</label>
                    <input type="password" id="confirm" name="confirm" placeholder="еще раз пароль" required>
                </p>
            </div>

            <div class="form__section">    
                <p class="form__field required">
                    <label for="city">Город:</label>
                    <input v-model="userData.city" type="text" id="city" name="city" placeholder="ваш город" required>
                </p>
                <p class="form__field required">
                    <label for="hospital">Место работы:</label>
                    <input v-model="userData.hospital.name" type="text" id="hospital" name="hospital" placeholder="лечебное учреждение" required>
                </p>
                <p class="form__field required">
                    <label for="adress">Адрес:</label>
                    <input v-model="userData.hospital.adress" type="text" id="adress" name="name" placeholder="адрес ЛПУ" required>
                </p>
                <p class="form__field">
                    <label for="phone">Телефон:</label>
                    <input v-model="userData.hospital.phone" type="text" id="phone" name="phone" placeholder="телефон" required>
                </p>       
                
            </div>
        </div>
        <button type="submit" class="button">Готово</button>

    </form>
</template>

<script>
import {HTTP} from '../../src/axios.conf'
export default {
    data() {
        return {
            userData: {
                login: '',
                password: '',
                name: '',
                city: '',
                hospital: {
                    name: '',
                    adress: '',
                    phone: ''
                }
            }
        }
    },
    methods: {
        register() {
            this.$emit('loading', true)
            HTTP
                .get('auth/register', {
                    params: {
                        login: this.userData.login
                    }
                })

                .then(res => {
                    const confirm = document.querySelector('#confirm').value 

                    if (!res.data && this.userData.password === confirm) {
                        this.sendRegisterData()
                    } 
                    if (res.data) {
                        this.$emit('show-message', {
                            title: 'Ошибка',
                            text: 'Пользователь с таким логином уже существует'
                        })   
                        this.$emit('loading', false)
                    } 
                    if (this.userData.password !== confirm) {
                        this.$emit('show-message', {
                            title: 'Ошибка',
                            text: 'Пароль не совпадает'
                        })   
                        this.$emit('loading', false)
                    }
                    
                })
                .catch(err => {
                    this.$emit('show-message', {
                        title: 'Ошибка',
                        text: err
                    })   
                    this.$emit('loading', false)
                })
        },
        sendRegisterData() {
            const formData = new FormData()
            
            formData.append('name', this.userData.name)
            formData.append('login', this.userData.login)
            formData.append('password', this.userData.password)
            formData.append('city', this.userData.city)
            formData.append('hospitalName', this.userData.hospital.name)
            formData.append('hospitalAdress', this.userData.hospital.adress)
            formData.append('hospitalPhone', this.userData.hospital.phone || '')

            HTTP
                .post('auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    this.$emit('loading', false)
                    this.$emit('show-message', {
                        title: 'Всё получилось',
                        text: 'Новый профиль создан - можно заходить'
                    })  
                    this.$router.push('/login')
                })
                .catch(err => {
                    this.$emit('loading', false)
                    this.$emit('show-message', {
                        title: 'Ошибка',
                        text: err
                    })  
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #ffffff;
}

.form__section {
    width: 260px;

    &:first-child {
        margin-right: 60px;
    }
}

.form__wrapper {
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
}
</style>
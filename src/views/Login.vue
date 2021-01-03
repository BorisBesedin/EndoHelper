<template>
    <form class="login form" @submit.prevent="login">
        <h2 class="title">Войти в аккаунт</h2>
        <div class="form__container">
            <p class="form__field">
                <label for="email">Email:</label>
                <input v-model="loginData.email" type="text" id="email" name="email" placeholder="email" required>
            </p>
            <p class="form__field">
                <label for="password">Пароль:</label>
                <input v-model="loginData.password" type="password" id="password" name="password" placeholder="пароль" required>
            </p>
            <p class="form__field">
                <span>Нет аккаунта?</span>
                <router-link class="nav-link" to="/registration">Зарегистироваться</router-link>
            </p>
            <button type="submit" class="button">Войти</button>
        </div> 
    </form>
</template>

<script>
import {HTTP} from '../../src/axios.conf'
export default {
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            }            
        }
    },
    methods: {
        login() {
            const formData = new FormData()
            this.$emit('loading', true)
            
            formData.append('email', this.loginData.email)
            formData.append('password', this.loginData.password)

            HTTP.post('auth/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    this.$emit('loading', false)

                    if (res.data.success) {
                        this.$router.push('/')
                    } else {
                        this.$emit('show-message', {
                            title: 'Неверные данные',
                            text: 'Проверьте логин и пароль'
                        })
                    }                    
                })
                .catch((e) => {
                    this.$emit('loading', false)
                    this.$emit('show-message', {
                        title: 'Ошибка соединения',
                        text: e
                    })
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
}

.form__container {
    margin-top: 60px;
    width: 400px;
}
</style>
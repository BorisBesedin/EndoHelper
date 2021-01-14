<template>
    <form class="login form" @submit.prevent="login">        
        <div class="form__container">
            <h2 class="title">Войти в аккаунт</h2>
            <p class="form__field">
                <label for="email">Логин:</label>
                <input v-model="loginData.login" type="text" id="login" name="login" placeholder="email" required>
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
                login: '',
                password: ''
            }            
        }
    },
    methods: {
        login() {
            const formData = new FormData()
            this.$emit('loading', true)
            
            formData.append('login', this.loginData.login)
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
    width: 500px;
    margin: 0 auto;
   
}

.form__container {
    margin-top: 60px;
    width: 100%;
    padding: 40px;
    box-shadow: 0 1px 4px 0 #666666;
    background-color: #ffffff;
}

.title {
    margin-top: 0;
    margin-bottom: 40px;
}
</style>
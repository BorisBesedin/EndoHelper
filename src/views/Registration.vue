<template>
    <form class="registration form" @submit.prevent="register">
        <h2 class="title">Регистрация</h2>
        <div class="form__container">
            <p class="form__field">
                <label for="email">Email:</label>
                <input v-model="userData.email" type="email" id="email" name="email" placeholder="email" required>
            </p>
            <p class="form__field">
                <label for="password">Пароль:</label>
                <input v-model="userData.password" type="password" id="password" name="password" placeholder="пароль" required>
            </p>
            <p class="form__field">
                <label for="confirm">Пароль еще раз:</label>
                <input type="password" id="confirm" name="confirm" placeholder="пароль" required>
            </p>
            <p class="form__field">
                <label for="name">Ваше имя:</label>
                <input v-model="userData.name" type="text" id="name" name="name" placeholder="имя полностью" required>
            </p>
            <p class="form__field">
                <label for="city">Город:</label>
                <input v-model="userData.city" type="text" id="city" name="city" placeholder="имя полностью" required>
            </p>
            <p class="form__field">
                <label for="hospital">Место работы:</label>
                <input v-model="userData.hospital.name" type="text" id="hospital" name="hospital" placeholder="лечебное учреждение" required>
            </p>
            <p class="form__field">
                <label for="adress">Адрес:</label>
                <input v-model="userData.hospital.adress" type="text" id="adress" name="name" placeholder="адрес ЛПУ" required>
            </p>
            <p class="form__field">
                <label for="phone">Телефон:</label>
                <input v-model="userData.hospital.phone" type="text" id="phone" name="phone" placeholder="телефон" required>
            </p>
            
            <button type="submit" class="button">Готово</button>
        </div>

        <Loader v-if="isLoading"/>
        <div class="atlas__overlay" v-if="messageIsShowing">
            <StatusMessage v-bind:message="message" v-if="messageIsShowing" @close-message="closeMessage" />
        </div>  

    </form>
</template>

<script>
import axios from 'axios'
import Loader from '../components/Loader'
import StatusMessage from '../components/StatusMessage'
export default {
    data() {
        return {
            isLoading: false,
            messageIsShowing: false,
            message: {
                title: '',
                text: ''
            },
            userData: {
                email: '',
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
    components: {
        Loader, StatusMessage
    },
    methods: {
        checkReg() {
            axios
                .get('https://endohelper.herokuapp.com/api/auth/register', {
                    params: {
                        email: this.userData.email
                    }
                })
                // .get('http://localhost:3000/api/auth/register', {
                //     params: {
                //         email: this.userData.email
                //     }
                // })
                .then(res => {
                    return res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        register() {
            this.isLoading = true
            const isRegistated = this.checkReg()
            const confirm = document.querySelector('#confirm').value            

            if (!isRegistated && this.userData.password === confirm) {
                const formData = new FormData()
            
                formData.append('name', this.userData.name)
                formData.append('email', this.userData.email)
                formData.append('password', this.userData.password)
                formData.append('city', this.userData.city)
                formData.append('hospitalName', this.userData.hospital.name)
                formData.append('hospitalAdress', this.userData.hospital.adress)
                formData.append('hospitalPhone', this.userData.hospital.phone)

                axios
                .post('https://endohelper.herokuapp.com/api/auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                // .post('http://localhost:3000/api/auth/register', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // })
                .then(() => {
                    this.isLoading = false
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    this.message.title = 'Успех!'
                    this.message.text = 'Пользователь создан'
                    this.messageIsShowing = true                    
                })
            } else if (this.userData.password !== confirm) {
                this.message.title = 'Ошибка'
                this.message.text = 'Пароль не совпадает'
                this.messageIsShowing = true 
                this.isLoading = false
            }
        },
        closeMessage() {
            this.messageIsShowing = false
            this.$router.push('/login')
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
}

.form__container {
    margin-top: 60px;
    width: 400px;
}
</style>
<template>
    <div class="atlas">
        <div class="atlas__menu">
            <h2 class="atlas__menu-title">Атлас</h2>
            <button v-if="isAuth" class="atlas__add" @click="popupIsShowing = true" aria-label="добавить фото"></button>
            <AtlasSection class="atlas__menu-content" v-for="category in atlasData"
                          :key="category.category"
                          v-bind:data="category"
                          @show="show"/>
        </div>
        <AtlasContent v-if="showingPathology" class="atlas__content" v-bind:showData="showingPathology" />
        <div v-if="!showingPathology" class="atlas__hidden">Выберите патологию для просмотра</div>
        <div class="atlas__overlay" v-if="popupIsShowing">
            <AddPhoto v-if="popupIsShowing"
                      class="atlas__add-photo"
                      @close-popup="closePopup"
                      @send-photo="sendPhoto"
                      v-bind:atlas="atlasData" />
        </div>
        <Loader v-if="isLoading"/>
        <div class="atlas__overlay" v-if="messageIsShowing">
            <StatusMessage v-bind:message="message" v-if="messageIsShowing" @close-message="closeMessage" />
        </div>        
    </div>
</template>

<script>
import axios from 'axios'
import AtlasSection from '../components/AtlasSection'
import AtlasContent from '../components/AtlasContent'
import Loader from '../components/Loader'
import StatusMessage from '../components/StatusMessage'
import AddPhoto from '../components/AddPhoto'
import atlasTemp from '../../public/data/atlas'
export default {
    components: {
        AtlasSection, AtlasContent, AddPhoto, Loader, StatusMessage
    },
    data() {
        return {
            isAuth: false,
            isLoading: false,
            popupIsShowing: false,
            messageIsShowing: false,
            message: {
                title: '',
                text: ''
            },
            atlasData: {},
            showingPathology: null
        }
    },
    methods: {
        checkAuth() {
            axios.get('https://endohelper.herokuapp.com/api/auth/login')
            // axios.get('http://localhost:3000/api/auth/login')
                .then(res => {
                this.isAuth = res.data.isAuth
                console.log(this.isAuth)
                })
                .catch(e => {
                console.log(e)
                })
        },
        updateAtlasData() {
            this.isLoading = true 
            
            this.atlasData.esophagus.pathology.forEach(item => item.images = [])    
            this.atlasData.gaster.pathology.forEach(item => item.images = [])
            this.atlasData.colon.pathology.forEach(item => item.images = [])    
            
            axios
                .get('https://endohelper.herokuapp.com/api/photos')
                // .get('http://localhost:3000/api/photos')
                .then(response => {
                    response.data.forEach(item => {
                        const index = this.atlasData[item.category].pathology.findIndex(elem => elem.id === item.pathology)

                        this.atlasData[item.category].pathology[index].images.unshift(item)                     
                    })
                    this.isLoading = false            
                })
                .catch(err => {
                    this.isLoading = false
                    this.messageIsShowing = true
                    this.message.title = `Упс...ошибка подключения:`
                    this.message.text = err
                })
        },
        updatePhoto(data) {
            this.updateAtlasData()
            const indexToShow = this.atlasData[data.category].pathology.findIndex(p => p.id === data.pathology)
            this.closePopup()
            this.show(this.atlasData[data.category].pathology[indexToShow])
        },
        show(data) {
            this.showingPathology = data
        },
        closePopup() {
            this.popupIsShowing = false          
        },
        closeMessage() {
            this.messageIsShowing = false
        },
        sendPhoto(data) {
            const photo = document.querySelector('#photo')
            const formData = new FormData()
            
            formData.append('author', data.author)
            formData.append('date', new Date())
            formData.append('category', data.category)
            formData.append('pathology', data.pathology)
            formData.append('description', data.description)
            formData.append('text', data.text)
            formData.append('photo', photo.files[0])
            
            this.isLoading = true

            axios.post('https://endohelper.herokuapp.com/api/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // axios.post('http://localhost:3000/api/photos', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            .then(() => {
                this.isLoading = false
                this.messageIsShowing = true
                this.message.title = 'Всё хорошо!'
                this.message.text = 'Изображение добавлено'
            })
            .catch(err => {
                this.isLoading = false
                this.messageIsShowing = true
                this.message.title = 'Ой! Что-то пошло не так:'
                this.message.text = err
            })
            this.updatePhoto(data)
        }
    },
    mounted() {
        this.atlasData = atlasTemp
        this.updateAtlasData()
        this.checkAuth()
    }
    
}
</script>

<style lang="scss">
.atlas {
    display: flex;
    flex-grow: 2;
}

.atlas__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
}

.atlas__add-photo {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.atlas__menu {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 300px;
    flex-shrink: 0;
    background-color: #ffffff;
    border-right: 4px solid #03416A
}

.atlas__menu-content {
    padding-left: 10px;
    padding-right: 10px;
}

.atlas__add {
    position: absolute;
    top: 15px;
    right: 10px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    opacity: 0.6;
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 50%;
    transition: 0.3s;

    &::before,
    &::after {
        position: absolute;
        content: "";
        top: 13px;
        right: 6px;
        width: 20px;
        height: 4px;
        background-color: #fff;
    }

    &:after {
        transform: rotate(-90deg);
    }

    &:hover {
        opacity: 1;
        transition: 0.3s;
    }
}

ul {
    list-style: none;
}

.atlas__content {
    margin-left: 50px;
    flex-grow: 1;
}

.atlas__menu-title {
    margin-bottom: 10px;
    padding: 20px;
    font-family: inherit;
    font-weight: normal;
    font-size: 20px;
    text-align: left;
    color: #ffffff;

    background-color: #03416A;
}

.atlas__hidden {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    opacity: 0.4;
}
</style>
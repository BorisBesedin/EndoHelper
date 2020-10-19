<template>
    <div class="atlas">
        <div class="atlas__menu">
            <h2 class="atlas__menu-title">Атлас</h2>
            <button class="atlas__add button small" @click="popupIsShowing = true">Добавить</button>
            <AtlasSection v-for="category in atlasData"
                          :key="category.category"
                          v-bind:data="category"
                          @show="show"/>
        </div>
        <AtlasContent v-if="showingPathology" class="atlas__content" v-bind:showData="showingPathology" />
        <div v-if="!showingPathology" class="atlas__hidden">Выберите патологию для просмотра</div>
        <div class="atlas__overlay" v-if="popupIsShowing">
            <AddPhoto v-if="popupIsShowing"
                      class="atlas__add-photo"
                      @close-popup="close"
                      @send-photo="sendPhoto"
                      v-bind:atlas="atlasData" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AtlasSection from '../components/AtlasSection'
import AtlasContent from '../components/AtlasContent'
import AddPhoto from '../components/AddPhoto'
export default {
    components: {
        AtlasSection, AtlasContent, AddPhoto
    },
    data() {
        return {
            popupIsShowing: false,
            atlasData: null,
            showingPathology: null
        }
    },
    methods: {
        update(data) {
            axios
                .get('https://afternoon-lowlands-89209.herokuapp.com/api/photos')
                .then(response => {
                    const index = this.atlasData[data.category].pathology.findIndex(p => p.id === data.pathology)
                    this.atlasData = response.data
                    this.close()
                    this.show(this.atlasData[data.category].pathology[index])
                    })
        },
        show(data) {
            this.showingPathology = data
        },
        close() {
            this.popupIsShowing = false
        },
        async sendPhoto(data) {
            const photo = document.querySelector('#photo')
            const formData = new FormData()
            
            formData.append('author', data.author)
            formData.append('date', new Date())
            formData.append('category', data.category)
            formData.append('pathology', data.pathology)
            formData.append('description', data.description)
            formData.append('text', data.text)
            formData.append('photo', photo.files[0])

            await axios.post('https://afternoon-lowlands-89209.herokuapp.com/api/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            this.update(data)
        }
    },
    mounted() {
        axios
            .get('https://afternoon-lowlands-89209.herokuapp.com/api/photos')
            .then(response => (this.atlasData = response.data))
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
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    width: 300px;
    flex-shrink: 0;
    border-right: 2px solid #a2a2a2; 
}

.atlas__add {
    position: absolute;
    top: 0;
    right: 30px;
}

ul {
    list-style: none;
}

.atlas__content {
    margin-left: 50px;
    flex-grow: 1;
}

.atlas__menu-title {
    margin-bottom: 40px;
    text-align: left;
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
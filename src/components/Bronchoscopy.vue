<template>
    <div class="description" >
        <Templates class="templates" v-bind:templates="templates" @delete-template="deleteTemplate" @set-template="setTemplate" /> 
        <div class="description__broncho part">
            <div class="description__buttons">
                <button class="button small description__normal-btn" @click="setNormal">Норма</button>
                <button class="button small" @click="clearFields">Очистить</button>
            </div>
            <h3 class="description__title">Бронхоскопия:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.view"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.view"
                            v-bind:place="Object.keys(userData)[0]"
                            @clear="setFocus"
            />
        </div>

        <div class="description__broncho part">
            <h3 class="description__title">Гортань:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.larynx"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.larynx"
                            v-bind:place="Object.keys(userData)[1]"
                            @clear="setFocus"
            />
        </div>  

        <div class="description__broncho part">
            <h3 class="description__title">Трахея:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.trachea"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.trachea"
                            v-bind:place="Object.keys(userData)[2]"
                            @clear="setFocus"
            />
        </div>

        <div class="description__broncho part">
            <h3 class="description__title">Бронхи:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.bronhus"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.bronhus"
                            v-bind:place="Object.keys(userData)[3]"
                            @clear="setFocus"
            />
        </div>        

        <div class="description__diagnose part">
            <h3 class="description__title">Заключение:</h3>
            <Diagnose v-bind:diagnose="descriptionData.diagnose" 
                      @clear="setFocus"
                      v-bind:userData="userData"/>
        </div>

        <div class="description__button">
            <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'bronchoscopy'}}"
                     v-bind:description="userData">Создать</router-link>
            <button class="button" @click="$emit('open-add-template', userData)">Шаблон</button>
        </div>
    </div>
</template>

<script>
import Templates from '../components/Templates'
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/bronchoscopy'
import Diagnose from '../components/Diagnose'
export default {
    props: ['patient', 'doctor', 'templates'],
    name: 'Colonoscopy',
    components: {
        DescriptionItem, Diagnose, Templates
    },
    data() {
        return {
            descriptionData: {},
            userData: {
                view: "",
                larynx: {
                    epiglottis: "",
                    arytenoid: "",
                    glottis: "",
                    vocal: "",
                    other: ""     
                },
                trachea: {
                    clearance: "",
                    content: "",
                    mucosa: "",
                    carine: "",
                    other: "" 
                },
                bronhus: {
                    clearance: "",
                    content: "",
                    mucosa: "",
                    other: "" 
                },
                diagnose: ""
            }
        }
    },
    methods: {
        setTemplate(template) {
            this.userData = template.description
        },
        deleteTemplate(template) {
            this.$emit('delete-template', template)
        },
        unfocus() {
            const elem = document.querySelector('.focus')

            if (elem) {
                elem.classList.remove('focus')
            }
        },
        setFocus(elem) {
            this.unfocus()
            elem.classList.add('focus')   
        },
        clearFields() {
            if (localStorage.bronchoscopy) {
                localStorage.bronchoscopy = '' 
            }

            this.userData = {
                view: "",
                larynx: {
                    epiglottis: "",
                    arytenoid: "",
                    glottis: "",
                    vocal: ""     
                },
                trachea: {
                    clearance: "",
                    content: "",
                    mucosa: "",
                    carine: ""
                },
                bronhus: {
                    clearance: "",
                    content: "",
                    mucosa: ""
                },
                diagnose: ""
            }
               
 
        },
        setNormal() {
            this.userData = this.descriptionData.normal
        }
    },
    mounted() {
        this.descriptionData = data;
        
        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT'
                && e.target.tagName !== 'TEXTAREA'
                && e.target.className !== 'helper-item') {
                this.unfocus()
            }
        })
        if (localStorage.bronchoscopy) {
            this.userData = JSON.parse(localStorage.bronchoscopy)
        }
    }    
}
</script>

<style lang="scss" scoped>
.description__button {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.part {
    width: 100%;
    margin-top: 40px;
    position: relative;
}
.submit {
    margin-right: 20px;
}
.item {
    width: 100%;
}
</style>
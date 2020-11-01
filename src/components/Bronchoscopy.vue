<template>
    <div class="description" >
        <Passport v-bind:patient="patient" v-bind:doctor="doctor" />

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

        <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'bronchoscopy'}}"
                     v-bind:description="userData">Создать</router-link>
    </div>
</template>

<script>
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/bronchoscopy'
import Diagnose from '../components/Diagnose'
import Passport from '../components/Passport'
export default {
    name: 'Colonoscopy',
    components: {
        DescriptionItem, Diagnose, Passport
    },
    data() {
        return {
            patient: {
                patient: '',
                birth: '',
                anestesia: '',
            },
            doctor: {
                hospital: '',
                phone: '',                
                endoscope: '',
                doctor: ''
            },
            descriptionData: {},
            userData: {
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
        }
    },
    methods: {
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
            const inputs = document.querySelectorAll('description-input')
            const textarea = document.querySelector('textarea')

            inputs.forEach(item => item.value = '')
            textarea.value = ''

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
        if (localStorage.doctor) {
            this.doctor = JSON.parse(localStorage.doctor)
        }
    }    
}
</script>

<style lang="scss" scoped>
.part {
    width: 100%;
    margin-top: 40px;
    position: relative;
}
.submit {
    margin-top: 20px;
}

.item {
    width: 100%;
}
</style>
<template>
    <div class="description description--gastro" >
        

        <Passport v-bind:patient="patient" v-bind:doctor="doctor" />
        
        <div class="description__esophagus part">
            <div class="description__buttons">
                <button class="button small description__normal-btn" @click="setNormal">Норма</button>
                <button class="button small" @click="clearFields">Очистить</button>
            </div>
            <h3 class="description__title">Пищевод:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.esophagus"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.esophagus"
                            v-bind:place="Object.keys(userData)[0]"
                            @clear="setFocus"
                            
            />
        </div>

        <div class="description__gaster part">
            <h3 class="description__title">Желудок:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.gaster"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.gaster"
                            v-bind:place="Object.keys(userData)[1]"
                            @clear="setFocus"
            />
        </div>

        <div class="description__duodenum part">
            <h3 class="description__title">ДПК:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.duodenum"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData.duodenum"
                            v-bind:place="Object.keys(userData)[2]"
                            @clear="setFocus"
            />
        </div>

        <div class="diagnose part">
            <h3 class="description__title">Заключение:</h3>
            <Diagnose v-bind:diagnose="descriptionData.diagnose" 
                      @clear="setFocus"
                      v-bind:userData="userData"/>
        </div>

        <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'gastroscopy'}}"
                     v-bind:description="userData">Создать</router-link>
    </div>
</template>

<script>
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/gastroscopy'
import Diagnose from '../components/Diagnose'
import Passport from '../components/Passport'

export default {
    name: 'Gastroscopy',
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
                esophagus: {
                    clearance: "",
                    content: "",
                    mucosa: "",
                    cardia: "",
                    veins: "",
                    zline: ""        
                },
                gaster: {
                    clearance: "",
                    content: "",
                    folds: "",
                    peristalsis: "",
                    mucosa: "",
                    pylorus: "",
                    retroflex: ""
                },
                duodenum: {
                    bulbClearance: "",
                    postbulb: "",
                    mucosa: "",
                    bds: ""
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

            if (localStorage.gastroscopy) {
                localStorage.gastroscopy = '' 
            }        
            this.userData = {
                    esophagus: {
                        clearance: "",
                        content: "",
                        mucosa: "",
                        cardia: "",
                        veins: "",
                        zline: ""        
                    },
                    gaster: {
                        clearance: "",
                        content: "",
                        folds: "",
                        peristalsis: "",
                        mucosa: "",
                        pylorus: "",
                        retroflex: ""
                    },
                    duodenum: {
                        bulbClearance: "",
                        postbulb: "",
                        mucosa: "",
                        bds: ""
                    },
                    diagnose: ""
                }
 
        },
        setNormal() {     
            this.userData.esophagus = this.descriptionData.esophagusNormal
            this.userData.gaster = this.descriptionData.gasterNormal
            this.userData.duodenum = this.descriptionData.duodenumNormal
            this.userData.diagnose = 'Патологии не выявлено'
         }
    },
    mounted() {
        this.descriptionData = data
        
        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT'
                && e.target.tagName !== 'TEXTAREA'
                && e.target.className !== 'helper-item') {
                this.unfocus()
            }
        })
        if (localStorage.gastroscopy) {
            this.userData = JSON.parse(localStorage.gastroscopy)
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
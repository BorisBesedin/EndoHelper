<template>
    <div class="description description--gastro">
        <Templates class="templates" v-bind:templates="templates" @delete-template="deleteTemplate" @set-template="setTemplate"/>     
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

        <div class="description__button">
            <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'gastroscopy'}}"
                        v-bind:description="userData">Создать</router-link>
            <button class="button" @click="$emit('open-add-template', userData)">Шаблон</button>
        </div>
    </div>
</template>

<script>
import Templates from '../components/Templates'
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/gastroscopy'
import Diagnose from '../components/Diagnose'

export default {
    props: ['patient', 'doctor', 'templates'],
    name: 'Gastroscopy',
    components: {
        DescriptionItem, Diagnose, Templates
    },
    data() {
        return {
            descriptionData: {},
            userData: {
                esophagus: {
                    clearance: "",
                    content: "",
                    mucosa: "",
                    cardia: "",
                    veins: "",
                    zline: "",
                    other: ""      
                },
                gaster: {
                    clearance: "",
                    content: "",
                    folds: "",
                    peristalsis: "",
                    mucosa: "",
                    pylorus: "",
                    retroflex: "",
                    other: "" 
                },
                duodenum: {
                    bulbClearance: "",
                    postbulb: "",
                    mucosa: "",
                    bds: "",
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
.submit {
    margin-right: 20px;
}
.part {
    width: 100%;
    margin-top: 40px;
    position: relative;
}

.item {
    width: 100%;
}
</style>
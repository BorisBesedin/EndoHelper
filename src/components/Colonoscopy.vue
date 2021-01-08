<template>
    <div class="description" >
        <Templates class="templates" v-bind:templates="templates" @delete-template="deleteTemplate" @set-template="setTemplate" /> 
        <div class="description__colono part">
            <div class="description__buttons">
                <button class="button small description__normal-btn" @click="setNormal">Норма</button>
                <button class="button small" @click="clearFields">Очистить</button>
            </div>
            <h3 class="description__title">Толстая кишка:</h3>
            <DescriptionItem class="item" v-for="sign in descriptionData.protocol"
                            :key="sign.name"
                            v-bind:sign="sign"
                            v-bind:userData="userData"
                            v-bind:place="Object.keys(userData)[2]"
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
            <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'colonoscopy'}}"
                     v-bind:description="userData">Создать</router-link>
            <button class="button" @click="$emit('open-add-template', userData)">Шаблон</button>
        </div> 
    </div>
</template>

<script>
import Templates from '../components/Templates'
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/colonoscopy'
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
                level: '',
                ileum: '',
                dome: '',
                valve: '',
                clearance: '',
                content: '',
                mucosa: '',
                folds: '',
                tone: '',
                sygma: '',
                rectum: '',
                other: '',
                diagnose: ''
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
            if (localStorage.colonoscopy) {
                localStorage.colonoscopy = '' 
            }

            this.userData = {
                level: '',
                ileum: '',
                dome: '',
                valve: '',
                clearance: '',
                content: '',
                mucosa: '',
                haustra: '',
                tone: '',
                sygma: '',
                rectum: '',
                diagnose: ''
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
        if (localStorage.colonoscopy) {
            this.userData = JSON.parse(localStorage.colonoscopy)
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
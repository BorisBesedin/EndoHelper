<template>
    <div class="description" >
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

        <router-link class="button submit" :to="{name: 'Preview', params: {patient: patient, doctor: doctor, description: userData, procedure: 'colonoscopy'}}"
                     v-bind:description="userData">Создать</router-link>
    </div>
</template>

<script>
import DescriptionItem from '../components/DescriptionItem'
import data from '../../public/data/colonoscopy'
import Diagnose from '../components/Diagnose'
export default {
    props: ['patient', 'doctor'],
    name: 'Colonoscopy',
    components: {
        DescriptionItem, Diagnose
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
                haustra: '',
                tone: '',
                sygma: '',
                rectum: '',
                diagnose: ''
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
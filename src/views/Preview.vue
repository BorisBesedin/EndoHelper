<template>
    <div class="wrapper">
        <div class="preview" v-if="doctor">
            <div class="preview__hospital">
                <p>{{doctor.hospital.name}}</p>
                <p>{{doctor.hospital.adress}}</p>
                <p>{{doctor.hospital.phone}}</p>
            </div>
            <h1 class="preview__name"> {{this.title}} </h1>        
            <div class="preview__passport">            
                <p class="preview__item">
                    <span>Пациент</span>
                    <span>: {{patient.patient}}</span>
                </p>
                <p class="preview__item">
                    <span>Дата рождения</span>
                    <span>: {{patient.birth}}</span>
                </p>
                <p class="preview__item">
                    <span>Цель исследования</span>
                    <span>: {{patient.goal}}</span>
                </p>
                <p class="preview__item">
                    <span>Жалобы</span>
                    <span>: {{patient.complains}}</span>
                </p>
                <p class="preview__item">
                    <span>Анамнез</span>
                    <span>: {{patient.anamnesis}}</span>
                </p>
                <p class="preview__item">
                    <span>Анестезия</span>
                    <span>: {{patient.anestesia}}</span>
                </p>
                <p class="preview__item">
                    <span>Модель аппарата</span>
                    <span>: {{patient.endoscope}}</span>
                </p> 
                <p class="preview__item">
                    <span>Дата исследования</span>
                    <span>: {{ date.getDate() }}.{{ date.getMonth() + 1 }}.{{ date.getFullYear() }}.
                    </span>
                </p>             
            </div>

            <PreviewGastro class="protocol" 
                        v-if="this.procedure === 'gastroscopy'" 
                        v-bind:description="description" />

            <PreviewColono class="protocol" 
                        v-if="this.procedure === 'colonoscopy'" 
                        v-bind:description="description" />

            <PreviewBroncho class="protocol" 
                        v-if="this.procedure === 'bronchoscopy'" 
                        v-bind:description="description" />       

            
            <p class="preview__doctor">
                <span>Эндоскопист</span>
                <span>: {{doctor.name}}</span>
            </p>
            <div class="preview__buttons">
                <router-link type="button" :to="{name: 'Record', params: {tab: this.procedure}}"><button class="preview__back preview__button"></button></router-link>
                <button class="preview__copy preview__button" @click="copy"></button>
                <button class="preview__print preview__button" @click="print"></button>
            </div>         
        </div>
    </div>
</template>

<script>
import PreviewGastro from '../components/PreviewGastro'
import PreviewColono from '../components/PreviewColono'
import PreviewBroncho from '../components/PreviewBroncho'
export default {
    props: ['procedure', 'description', 'patient', 'doctor'],
    components: {
        PreviewGastro, PreviewColono, PreviewBroncho
    },
    data() {
        return {
            date: new Date()
        }
    },
    mounted() {
        if (!this.description || !this.procedure || !this.patient || !this.doctor) {
            this.$router.push('/record')
        }      
        if (this.patient) {
            localStorage.setItem('patient', JSON.stringify(this.patient))
        }       
    },
    methods: {
        copy() {
            const target = document.querySelector('.preview')
            const range = document.createRange()
            const selection = window.getSelection()

            range.selectNode(target)
            selection.removeAllRanges()
            selection.addRange(range)
            document.execCommand("copy")
        },
        print() {
            const blockToPrint = document.querySelector('.preview')
            const font = '<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,600;0,700;1,500&display=swap" rel="stylesheet">'
            const printCSS = '<link rel="stylesheet" href="/styles/print.css" type="text/css" />';
            let print = window.open()

            print.document.write(`
                <div class="print-doc">
                    ${font}
                    ${printCSS}
                    ${blockToPrint.innerHTML}
                </div>
            `)
            print.document.close()
            print.focus()
            print.print()
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background-color: #ffffff;
}
.preview {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    padding-bottom: 80px;    
    width: 600px;
    margin: 0 auto;
    color: #000;
}

.preview__name {
    margin-top: 40px;
    font-size: 18px;
    text-align: center;
}

.preview__passport {
    margin-top: 40px;
    margin-bottom: 20px;
}

.preview__buttons {
    margin-top: 40px;
}

.preview__button {
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    opacity: 0.8;   
    background-color: transparent; 
    background-repeat: no-repeat;
    background-size: contain;
    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 1;
        transition: 0.3s ease-in-out;
    }

    &:not(:first-child) {
        margin-left: 20px;
    }
}

.preview__copy {
    background-image: url('../assets/icons/copy.png');
}

.preview__print {
    background-image: url('../assets/icons/printer.png');
}

.preview__back {
    background-image: url('../assets/icons/left-arrow.png');
}

span {    
    text-align: left;
    font-size: 12px;
    line-height: 16px;

    &:first-child {
        font-weight: bolder;
        flex-shrink: 0;
    }
}

p {
    text-align: left;
    font-size: 12px;
    line-height: 16px;
}

.preview__item {
    display: flex;
    font-weight: bolder;
}

.preview__doctor {
    text-align: center;
    margin-top: 40px;
}
</style>

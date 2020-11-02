<template>
    <div class="preview">
        <div class="preview__hospital">
            <p>{{doctor.hospital}}</p>
            <p>{{doctor.adress}}</p>
            <p>{{doctor.phone}}</p>
        </div>
        <h1 class="preview__name"> {{this.title}} </h1>        
        <div class="preview__passport">            
            <p class="preview__item">
                <span>Пациент:</span>
                <span>: {{patient.patient}}</span>
            </p>
            <p class="preview__item">
                <span>Дата рождения:</span>
                <span>: {{patient.birth}}</span>
            </p>
            <p class="preview__item">
                <span>Анестезия:</span>
                <span>: {{patient.anestesia}}</span>
            </p>
            <p class="preview__item">
                <span>Модель аппарата:</span>
                <span>: {{doctor.endoscope}}</span>
            </p>            
        </div>
        
        <div class="preview__template preview__gastro" v-if="this.procedure === 'gastroscopy'">
            <h3 class="preview__title">Пищевод</h3>
            <p class="preview__item" v-for="item in this.templateGastro.esophagus" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description.esophagus[item.name]}}</span>
            </p>
            <h3 class="preview__title">Желудок</h3>
            <p class="preview__item" v-for="item in this.templateGastro.gaster" :key="item.id">
                <span> {{item.title}}</span>
                <span v-if="description">: {{description.gaster[item.name]}}</span>
            </p>
            <h3 class="preview__title">ДПК</h3>
            <p class="preview__item" v-for="item in this.templateGastro.duodenum" :key="item.id">
                <span> {{item.title}}</span>
                <span v-if="description">: {{description.duodenum[item.name]}}</span>
            </p>

            <h3 class="preview__title">Заключение</h3>
            <p class="preview__item" v-if="description">{{description.diagnose}}</p>                      
        </div>

        <div class="preview__template preview__colono" v-if="this.procedure === 'colonoscopy'">
            <p class="preview__item" v-for="item in this.templateColono.protocol" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description[item.name]}}</span>
            </p>
            
            <h3 class="preview__title">Заключение</h3>
            <p class="preview__item" v-if="description">{{description.diagnose}}</p>                      
        </div>

        <div class="preview__template preview__broncho" v-if="this.procedure === 'bronchoscopy'">
            <p class="preview__item" v-for="item in this.templateBroncho.view" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description.view[item.name]}}</span>
            </p>

            <h3 class="preview__title">Гортань:</h3>
            <p class="preview__item" v-for="item in this.templateBroncho.larynx" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description.larynx[item.name]}}</span>
            </p>

            <h3 class="preview__title">Трахея:</h3>
            <p class="preview__item" v-for="item in this.templateBroncho.trachea" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description.trachea[item.name]}}</span>
            </p>

            <h3 class="preview__title">Бронхи:</h3>
            <p class="preview__item" v-for="item in this.templateBroncho.bronhus" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description.bronhus[item.name]}}</span>
            </p>
            
            <h3 class="preview__title">Заключение</h3>
            <p class="preview__item" v-if="description">{{description.diagnose}}</p>                      
        </div> 

        <p class="preview__doctor">
            <span>Эндоскопист:</span>
            <span>: {{doctor.doctor}}</span>
        </p>
        <div class="preview__buttons">
            <router-link type="button" :to="{name: 'Record', params: {tab: this.procedure}}"><button class="preview__back preview__button"></button></router-link>
            <button class="preview__copy preview__button" @click="copy"></button>
            <button class="preview__print preview__button" @click="print"></button>
        </div>         
    </div>
</template>

<script>
import gastroscopy from '../../public/data/gastroscopy'
import colonoscopy from '../../public/data/colonoscopy'
import bronchoscopy from '../../public/data/bronchoscopy'
export default {
    props: ['procedure', 'description', 'patient', 'doctor'],
    data() {
        return {
            templateGastro: gastroscopy,
            templateColono: colonoscopy,
            templateBroncho: bronchoscopy,
            title: ''
        }
    },
    mounted() {        
        if (this.doctor) {
            localStorage.setItem('doctor', JSON.stringify(this.doctor))
        }
        switch(this.procedure) {
            case 'gastroscopy':
                localStorage.setItem('gastroscopy', JSON.stringify(this.description))
                this.title = 'Видеогастроскопия'
                break

            case 'colonoscopy':
                localStorage.setItem('colonoscopy', JSON.stringify(this.description))
                this.title = 'Видеоколоноскопия'
                break
            case 'bronchoscopy':
                localStorage.setItem('bronchoscopy', JSON.stringify(this.description))
                this.title = 'Бронхоскопия'
                break
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
            const printCSS = '<link rel="stylesheet" href="/styles/print.css" type="text/css" />';
            let print = window.open()

            print.document.write(`
                <div class="print-doc">
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

.preview__item {
    margin: 0;
    padding-left: 10px;
}
.preview__title {
    padding: 5px;
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: left;
    text-decoration: underline;
    background-color: #e5e5e5;
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
    background-image: url('../../public/icons/copy.png');
}

.preview__print {
    background-image: url('../../public/icons/printer.png');
}

.preview__back {
    background-image: url('../../public/icons/left-arrow.png');
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
}

.preview__doctor {
    text-align: center;
    margin-top: 40px;
}
</style>

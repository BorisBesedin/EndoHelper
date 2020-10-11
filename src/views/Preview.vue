<template>
    <div class="preview">
        <div class="preview__template preview__gastro" v-if="this.procedure === 'gastro'">
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
            <div class="preview__buttons">
                <router-link type="button" to="/record"><button class="preview__back preview__button"></button></router-link>
                <button class="preview__copy preview__button" @click="copy"></button>
            </div>            
        </div>

        <div class="preview__template preview__colono" v-if="this.procedure === 'colono'">
            <h3 class="preview__title">Видеоколоноскопия</h3>
            <p class="preview__item" v-for="item in this.templateColono.protocol" :key="item.id">
                <span>{{item.title}}</span>
                <span v-if="description">: {{description[item.name]}}</span>
            </p>
            
            <h3 class="preview__title">Заключение</h3>
            <p class="preview__item" v-if="description">{{description.diagnose}}</p>
            <div class="preview__buttons">
                <router-link type="button" :to="{name: 'Record', params: {tab: 'colonoscopy'}}"><button class="preview__back preview__button"></button></router-link>
                <button class="preview__copy preview__button" @click="copy"></button>
            </div>            
        </div>

        <div class="preview__template preview__broncho" v-if="this.procedure === 'broncho'">
            <h3 class="preview__title">Бронхоскопия</h3>
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
            <div class="preview__buttons">
                <router-link type="button" :to="{name: 'Record', params: {tab: 'bronchoscopy'}}"><button class="preview__back preview__button"></button></router-link>
                <button class="preview__copy preview__button" @click="copy"></button>
            </div>            
        </div>


    </div>
</template>

<script>
import gastroscopy from '../../public/data/gastroscopy'
import colonoscopy from '../../public/data/colonoscopy'
import bronchoscopy from '../../public/data/bronchoscopy'
export default {
    props: ['procedure', 'description'],
    data() {
        return {
            templateGastro: gastroscopy,
            templateColono: colonoscopy,
            templateBroncho: bronchoscopy
        }
    },
    mounted() {
        switch(this.procedure) {
            case 'gastro':
                localStorage.setItem('gastroscopy', JSON.stringify(this.description))
                break

            case 'colono':
                localStorage.setItem('colonoscopy', JSON.stringify(this.description))
                break
            case 'broncho':
                localStorage.setItem('bronchoscopy', JSON.stringify(this.description))
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
        }
    }
}
</script>

<style lang="scss" scoped>
.preview {
    padding-top: 40px;
    padding-bottom: 80px;    
    width: 600px;
    margin: 0 auto;
    color: #000;
}

.preview__item {
    margin-bottom: 5px;
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

    &:first-child {
        margin-right: 20px;
    }
}

.preview__copy {
    background-image: url('../../public/icons/copy.png');
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
</style>

<template>
    <div class="protocol">
        <div class="protocol__section">
            <p>
                Осмотр {{ description.view.method}}.
            </p>
            <div>
                <p v-if="description.larynx.epiglottis">Надгортанник {{description.larynx.epiglottis}}.</p>
                <p v-if="description.larynx.arytenoid">Черпаловидные хрящи {{description.larynx.arytenoid}}.</p>
                <p v-if="description.larynx.glottis">Голосовая щель {{description.larynx.glottis}}.</p>
                <p v-if="description.larynx.vocal">Голосовые складки {{description.larynx.vocal}}.</p>
                <p v-if="description.larynx.other">{{description.larynx.other}}.</p>   
            </div>   
            <div>
                <p v-if="description.trachea.clearance">Просвет трахеи {{description.trachea.clearance}}.</p>
                <p v-if="description.trachea.content">В просвете {{description.trachea.content}}.</p>
                <p v-if="description.trachea.mucosa">Слизистая трахеи {{description.trachea.mucosa}}.</p>
                <p v-if="description.trachea.carine">Карина {{description.trachea.carine}}.</p>
                <p v-if="description.trachea.other">{{description.trachea.other}}.</p>   
            </div>  
            <div>
                <p v-if="description.bronhus.clearance">Устья бронхов {{description.bronhus.clearance}}.</p>
                <p v-if="description.bronhus.content">В просвете {{description.bronhus.content}}.</p>
                <p v-if="description.bronhus.mucosa">Слизистая бронхов {{description.bronhus.mucosa}}.</p>
                <p v-if="description.bronhus.other">{{description.bronhus.other}}.</p>   
            </div> 
        </div>

        <div class="protocol__section">
            <h3>Заключение</h3>
            <p>
                {{description.diagnose}}
            </p>  
        </div>              
    </div>
</template>

<script>
export default {
    props: ['description']
}
</script>

<style lang="scss" scoped>
.protocol {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.protocol__section {
    margin-top: 20px;
}

h3 {
    font-size: 16px;
    line-height: 20px;
}

p {
    margin-top: 5px;
    font-size: 14px;
    line-height: 18px;
}
</style>
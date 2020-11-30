<template>
    <div class="protocol">
        <div class="protocol__section">
            <h3>Пищевод</h3>
            <div>
                <p v-if="description.esophagus.clearance">Просвет пищевода {{description.esophagus.clearance}}.</p>
                <p v-if="description.esophagus.content">В просвете {{description.esophagus.content}}.</p>
                <p v-if="description.esophagus.mucosa">Слизистая пищевода {{description.esophagus.mucosa}}.</p>
                <p v-if="description.esophagus.veins">Вены пищевода {{description.esophagus.veins}}.</p>
                <p v-if="description.esophagus.cardia">Кардиальный жом {{description.esophagus.cardia}}.</p>
                <p v-if="description.esophagus.zline">Z-линия {{description.esophagus.zline}}.</p>
                <p v-if="description.esophagus.other">{{description.gaster.other}}.</p>   
            </div>  
        </div>

        <div class="protocol__section">
            <h3>Желудок</h3>
            <div>
                <p v-if="description.gaster.clearance">Просвет желудка {{description.gaster.clearance}}.</p>
                <p v-if="description.gaster.content">В просвете {{description.gaster.content}}.</p>
                <p v-if="description.gaster.folds">Складки {{description.gaster.folds}}.</p>
                <p v-if="description.gaster.peristalsis">Перистальтика {{description.gaster.peristalsis}}.</p>
                <p v-if="description.gaster.mucosa">Слизистая желудка {{description.gaster.mucosa}}.</p>
                <p v-if="description.gaster.pylorus">Привратник {{description.gaster.pylorus}}.</p>
                <p v-if="description.gaster.retroflex">При осмотре в положении ретрофлексии {{description.gaster.retroflex}}.</p>
                <p v-if="description.gaster.other">{{description.gaster.other}}.</p>  
            </div>  
        </div>

        <div class="protocol__section">
            <h3>ДПК</h3>
            <div>
                <p v-if="description.duodenum.bulbClearance">Луковица ДПК {{description.duodenum.bulbClearance}}.</p>
                <p v-if="description.duodenum.mucosa">Слизистая {{description.duodenum.mucosa}}.</p>
                <p v-if="description.duodenum.postbulb">Постбульбарные отделы {{description.duodenum.postbulb}}.</p>
                <p v-if="description.duodenum.bds">БДС {{description.duodenum.bds}}.</p> 
                <p v-if="description.duodenum.other">БДС {{description.duodenum.other}}.</p>   
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
<template>
    <div class="protocol">
        <div class="protocol__section">
            <h3>Пищевод</h3>
            <p>
                Просвет пищевода {{description.esophagus.clearance}}. В просвете {{description.esophagus.content}}.
                Слизистая пищевода {{description.esophagus.mucosa}}. Вены пищевода {{description.esophagus.veins}}. 
                Кардиальный жом {{description.esophagus.cardia}}. 
                Z-линия {{description.esophagus.zline}}.
            </p>  
        </div>

        <div class="protocol__section">
            <h3>Желудок</h3>
            <p>
                Просвет желудка {{description.gaster.clearance}}. 
                В просвете {{description.gaster.content}}. 
                Складки {{description.gaster.folds}}.
                Перистальтика {{description.gaster.peristalsis}}.
                Слизистая желудка {{description.gaster.mucosa}}. 
                Привратник {{description.gaster.pylorus}}. 
                При осмотре в положении ретрофлексии {{description.gaster.retroflex}}.
            </p>  
        </div>

        <div class="protocol__section">
            <h3>ДПК</h3>
            <p>
                Луковица ДПК {{description.duodenum.bulbClearance}}. 
                Слизистая {{description.duodenum.mucosa}}.
                Постбульбарные отделы {{description.duodenum.postbulb}}.
                БДС {{description.duodenum.bds}}.
            </p>  
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
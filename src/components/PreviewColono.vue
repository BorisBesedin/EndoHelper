<template>
    <div class="protocol">
        <div class="protocol__section">
            <div>
                <p v-if="description.level">Аппарат проведен {{description.level}}.</p>
                <p v-if="description.ileum">Слизистая дистального отдела подвздошной кишки {{description.ileum}}.</p>
                <p v-if="description.dome">Купол слепой кишки {{description.dome}}.</p>
                <p v-if="description.valve">Баугиниева заслонка {{description.valve}}.</p></div>           
        </div>

        <div class="protocol__section">
            <div>
                <p v-if="description.clearance">Просвет осмотренных отделов толстой кишки {{description.clearance}}.</p>
                <p v-if="description.content">В просвете {{description.content}}.</p>
                <p v-if="description.folds">Складки {{description.folds}}.</p>
                <p v-if="description.tone">Тонус {{description.tone}}.</p>
                <p v-if="description.mucosa">Слизистая на всем протяжении {{description.mucosa}}.</p>
            </div>
        </div>

        <div class="protocol__section">
            <div>
                <p v-if="description.sygma">Сигмовидная кишка {{description.sygma}}.</p>
                <p v-if="description.rectum">Слизистая прямой кишки {{description.rectum}}. </p>
                <p v-if="description.other">{{description.other}}.</p>   
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
    font-size: 14px;
    line-height: 18px;
}

p {
    margin-top: 5px;
    font-size: 12px;
    line-height: 16px;
}
</style>
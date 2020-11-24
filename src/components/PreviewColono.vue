<template>
    <div class="protocol">
        <div class="protocol__section">
            <p>
                Аппарат проведен {{description.level}}. 
                Слизистая дистального отдела подвздошной кишки {{description.ileum}}. 
                Купол слепой кишки {{description.dome}}. 
                Баугиниева заслонка {{description.valve}}. 
            </p>           
        </div>

        <div class="protocol__section">
            <p>
                Просвет осмотренных отделов толстой кишки {{description.clearance}}. 
                В просвете {{description.content}}. 
                Складки {{description.folds}}. 
                Тонус {{description.tone}}. 
                Слизистая на всем протяжении {{description.mucosa}}. 
            </p>
        </div>

        <div class="protocol__section">
            <p>
                Сигмовидная кишка {{description.sygma}}. 
                Слизистая прямой кишки {{description.rectum}}. 
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
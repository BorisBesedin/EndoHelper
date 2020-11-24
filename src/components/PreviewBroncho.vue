<template>
    <div class="protocol">
        <div class="protocol__section">
            <p>
                Осмотр {{ description.view.method}}.
            </p>
            <p>
                Надгортанник {{description.larynx.epiglottis}}.
                Черпаловидные хрящи {{description.larynx.arytenoid}}.
                Голосовая щель {{description.larynx.glottis}}.
                Голосовые складки {{description.larynx.vocal}}.
            </p>   
            <p>
                Просвет трахеи {{description.trachea.clearance}}.
                В просвете {{description.trachea.content}}.
                Слизистая {{description.trachea.mucosa}}.
                Карина {{description.trachea.carine}}.
            </p>  
            <p>
                Устья бронхов {{description.bronhus.clearance}}.
                В просвете {{description.bronhus.content}}.
                Слизистая {{description.bronhus.mucosa}}.
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
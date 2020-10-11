<template>
    <div class="atlas">
        <div class="atlas__menu">
            <AtlasSection v-for="category in atlasData"
                          :key="category.category"
                          v-bind:data="category"
                          @show="show"/>
        </div>
        <AtlasContent  class="atlas__content" v-bind:showData="showingPathology" />
    </div>
</template>

<script>
import AtlasSection from '../components/AtlasSection'
import AtlasContent from '../components/AtlasContent'
import atlas from '../../public/data/atlas'
export default {
    components: {
        AtlasSection, AtlasContent
    },
    data() {
        return {
            atlasData: atlas,
            showingPathology: {}
        }
    },
    methods: {
        show(data) {
            console.log(data)
            this.showingPathology = data
        }
    }
    
}
</script>

<style lang="scss">
.atlas {
    display: flex;
    flex-grow: 2;
}

.atlas__menu {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    width: 300px;
    flex-shrink: 0;
    border-right: 2px solid #a2a2a2; 
}

ul {
    list-style: none;
}

.atlas__content {
    margin-left: 50px;
    flex-grow: 1;
}
</style>
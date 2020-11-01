<template>
  <div class="record">    
    <div class="record__menu">
      <button class="record__tab"
              v-for="procedure in procedures"
              :key = "procedure.name"
              v-bind:class="[{active: currentProcedure === procedure.name}]"
              v-on:click="currentProcedure = procedure.name"> {{procedure.title}} </button>
    </div>
    <p class="record__file-link">Терминология: <a href="files/MST3_EE.pdf" target="_blank">МСТ 3.0</a></p>
    
    <component class="record__content" v-bind:is="currentComponent"></component>
  </div>
</template>

<script>
import Gastroscopy from '../components/Gastroscopy'
import Colonoscopy from '../components/Colonoscopy'
import Bronchoscopy from '../components/Bronchoscopy'
export default {
  name: 'Record',
  props:['tab'],
  components: {
    Gastroscopy, Colonoscopy, Bronchoscopy
    },
  data() {
    return {
      procedures: [
        {
          name: "gastroscopy",
          title: "Гастроскопия"
        },
        {
          name: "colonoscopy",
          title: "Колоноскопия"
        },
        {
          name: "bronchoscopy",
          title: "Бронхоскопия"
        }      
      ],
      currentProcedure: this.tab || "gastroscopy",
      descriprion: {}
    }
  },
  computed: {
    currentComponent() {
      return this.currentProcedure.toLowerCase()
    }
  },
  methods: {
    setTab(tab) {
      this.currentProcedure = tab
    }
  }
}
</script>

<style lang="scss">
.record__file-link {
  margin-top: 20px;
  color: #000000;
  font-size: 16px;
}
.record__menu {
  margin-top: 40px;
}
.record__tab {
  border: none;
  border: 4px solid transparent;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
  font-size: 18px;
  outline: none;
  cursor: pointer;

  &.active {
    border-color: green;
    transition: 0.3s ease-in-out;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
.record__content {
  margin-top: 40px;
}

.description__title {
    text-align: left;
    font-size: 18px;
    margin-bottom: 20px;
}
.description__normal-btn {
    margin-right: 10px;
}
.description {
    position: relative;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    margin: 0 auto;
}

.description__buttons {
    position: absolute;
    top: 0;
    right: 0;
}
</style>

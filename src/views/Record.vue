<template>
  <div class="create-record">
    <div class="menu">
      <button class="tab"
              v-for="procedure in procedures"
              :key = "procedure.name"
              v-bind:class="[{active: currentProcedure === procedure.name}]"
              v-on:click="currentProcedure = procedure.name"> {{procedure.title}} </button>
    </div>
    <component class="content" v-bind:is="currentComponent"></component>
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
.menu {
  margin-top: 40px;
}
.tab {
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
.content {
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
    top: 50px;
    right: 0;
}
</style>

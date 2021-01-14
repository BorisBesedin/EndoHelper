<template>
  <div class="record">
    <div class="record__tabs">
      <button
        class="record__tab"
        v-for="procedure in procedures"
        :key="procedure.name"
        v-bind:class="[{ active: currentProcedure === procedure.name }]"
        v-on:click="currentProcedure = procedure.name"
      >
        {{ procedure.title }}
      </button>
    </div>
    <!-- <p class="record__file-link">
            Терминология: <br> <a href="files/MST3_EE.pdf" target="_blank">МСТ 3.0</a>
          </p>           -->

    <div class="record__section">
      <Passport
        class="record__passport"
        v-bind:patient="patient"
        @clear-doctor="clearPatient"
      />
      <component
        class="record__content"
        v-bind:is="currentComponent"
        v-bind:patient="patient"
        v-bind:doctor="doctor"
        v-bind:templates="templates"
        @open-add-template="openAddTemplatePopup"
        @delete-template="deleteTemplate"
      ></component>
    </div>
    <div class="atlas__overlay" v-if="templatePopupIsShowing">
      <AddTemplate v-if="templatePopupIsShowing" @close-popup="closeAddTemplatePopup" @add-template="addTemplate" />

    </div>
    
  </div>
</template>

<script>
import { HTTP } from "../../src/axios.conf";
import AddTemplate from "../components/AddTemplate"
import Gastroscopy from "../components/Gastroscopy";
import Colonoscopy from "../components/Colonoscopy";
import Bronchoscopy from "../components/Bronchoscopy";
import Passport from "../components/Passport";
export default {
  name: "Record",
  props: ["tab", "isAuth"],
  components: {
    Gastroscopy,
    Colonoscopy,
    Bronchoscopy,
    Passport,
    AddTemplate
  },
  data() {
    return {
      procedures: [
        {
          name: "gastroscopy",
          title: "Гастроскопия",
        },
        {
          name: "colonoscopy",
          title: "Колоноскопия",
        },
        {
          name: "bronchoscopy",
          title: "Бронхоскопия",
        },
      ],
      currentProcedure: this.tab || "gastroscopy",
      patient: {
        patient: "",
        birth: "",
        goal: "",
        complains: "",
        anamnesis: "",
        anestesia: "",
        endoscope: "",
      },
      doctor: {},
      templates: [],
      templateToAdd: {
        id: '',
        name: '',
        category: '',
        description: ''
      },
      templatePopupIsShowing: false
    };
  },
  computed: {
    currentComponent() {
      return this.currentProcedure.toLowerCase();
    },
  },
  mounted() {
    if (localStorage.patient) {
      this.patient = JSON.parse(localStorage.patient);
    }    
    this.getUserData()
  },
  methods: {
    getUserData() {
      HTTP.get("users")
          .then((res) => {
            this.doctor = res.data;
            this.templates = this.doctor.templates.filter(temp => temp.category === this.currentProcedure)
          })
          .catch((e) => {
            console.log(e);
          });
    },
    deleteTemplate(template) {
      this.$emit('loading', true)
      HTTP.post('auth/template/delete', template)
          .then(() => {
            this.$emit('loading', false)
            this.$emit('show-message', {
              title: 'Получилось',
              text: `Шаблон ${template.name} удален`
            })
            this.getUserData()
          })
          .catch(e => {
            this.$emit('loading', false)
            this.$emit('show-message', {
              title: 'Не вышло',
              text: e
            })
          })
    },
    addTemplate(name) {
      this.templatePopupIsShowing = false
      this.$emit('loading', true)
      this.templateToAdd.name = name
      this.templateToAdd.category = this.currentProcedure
      this.templateToAdd.id = new Date()

      HTTP.post('auth/template', this.templateToAdd)
          .then(() => {
            this.$emit('loading', false)
            this.$emit('show-message', {
              title: 'Готово!',
              text: `Шаблон ${this.templateToAdd.name} добавлен`
            })
            this.getUserData()
          })
          .catch(e => {
            this.$emit('loading', false)
            this.$emit('show-message', {
              title: 'Не получилось:',
              text: e
            })
          })
    },
    closeAddTemplatePopup() {
      this.templatePopupIsShowing = false
      this.templateToAdd.description = ''
    },
    openAddTemplatePopup(template) {
      this.templatePopupIsShowing = true
      this.templateToAdd.description = template
    },
    setTab(tab) {
      this.currentProcedure = tab;
    },
    clearPatient() {
      if (localStorage.patient) {
        localStorage.patient = "";
      }

      this.patient = {
        patient: "",
        birth: "",
        complains: "",
        anamnesis: "",
        anestesia: "",
        endoscope: "",
      };
    },
  },
  watch: {
    currentProcedure() {
      this.getUserData()
    }
    // isAuth() {
    //   if(!this.isAuth) {
    //     this.$router.push('/login')
    //   }
    // }
  },
};
</script>

<style lang="scss">
.record {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;  
}

.title {
  margin-top: 40px;
}

.record__passport {
  width: 700px;
  margin-top: 60px;
}

.record__section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 1px 4px 0 #666666;
  background-color: #ffffff;

  &:last-child {
    flex-grow: 1;
  }
}

.record__file-link {
  margin-top: 20px;
  color: #000000;
  font-size: 16px;
}

.record__tabs {
  display: flex;
}
.record__tab {
  width: 160px;
  padding: 10px;

  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: none;
  outline: none;
  transform: scale(0.98);
  color: #454c50;
  font-family: inherit;
  background-color: #e2e2e2;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #a9cce4;
    transition: 0.3s ease-in-out;
  }

  &.active {
    border-color: #0a67a3;
    background-color: #6CA0C2;
    color: #ffffff;
    transition: 0.3s ease-in-out;
    transform: scale(1.02);
  }
}

.description__title {
  text-align: left;
  font-size: 16px;
  margin-bottom: 20px;
}
.description__normal-btn {
  margin-right: 10px;
}
.description {
  position: relative;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description__buttons {
  position: absolute;
  top: 0;
  right: 0;
}
.templates {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 10;
}
</style>

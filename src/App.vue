<template>
  <div id="app">
    <div class="header">
      <div class="header__logo"></div>
      <div id="nav" class="nav header__nav">
        <router-link class="nav__link" to="/">Атлас</router-link>
        <router-link v-if="isAuth" class="nav-link" to="/record">Создать протокол</router-link>
        <a v-if="!isAuth" class="nav__link--disabled">Создать протокол</a>
        <router-link class="nav-link" to="/about">Информация</router-link>
        <router-link v-if="!isAuth" class="nav__link" to="/login">Войти</router-link>
        <router-link v-if="isAuth" class="nav__link" to="/profile">Профиль</router-link>
        <a v-if="isAuth" class="nav__link" @click="logout">Выйти</a>
      </div>
    </div>  
    
    <router-view v-bind:isAuth="isAuth" @loading="setLoader" @show-message="showMessage" class="content"/>

    <Loader v-if="isLoading"/>

    <div class="atlas__overlay" v-if="messageIsShowing">
      <StatusMessage v-bind:message="message" v-if="messageIsShowing" @close-message="closeMessage" />
    </div>

  </div>
</template>

<script>
import {HTTP} from '../src/axios.conf'
import Loader from '../src/components/Loader'
import StatusMessage from '../src/components/StatusMessage'
export default {
  data() {
    return {
      isLoading: false,
      isAuth: false,
      messageIsShowing: false,
      message: null
    }
  },
  components: {
    Loader, StatusMessage
  },
  methods: {
    setLoader(boolean) {
      this.isLoading = boolean
    },
    showMessage(message) {
      this.message = message
      this.messageIsShowing = true
    },
    closeMessage() {
      this.messageIsShowing = false
    },
    checkAuth() {
      HTTP.get('auth/login')
         .then(res => {
           this.isAuth = res.data.isAuth
         })
         .catch(e => {
           console.log(e)
         })
    },
    logout() {
      this.isLoading = true
      HTTP.get('auth/logout')
          .then(res => {
            this.isLoading = false
            this.isAuth = res.data.isAuth
            if (this.$route.path !== '/login') {
              this.$router.push('/login')
            }          
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    this.checkAuth()
  },
  watch: {
    $route() {
      this.checkAuth()    
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar { /* chrome based */
    width: 0px;  /* ширина scrollbar'a */
    background: transparent;  /* опционально */
}

html {
    -ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none; /* Firefox */
}

body {
  font-family: 'Roboto Mono', 'Arial', monospace;
}

#app {  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #444a4e;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}

.header {
  background-color:#D4E9F7;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  margin-left: 20px;
  width: 250px;
  height: 50px;
  background-image: url('../public/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.header__nav {
  display: flex;

  a {
    display: block;
    padding: 25px;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color:#a2c9e4;
      transition: 0.3s;
    }

    &.router-link-exact-active {
      background-color:#6CA0C2;
      color: #ffffff;
      transition: 0.3s ease-in-out;
    }
  }
}

.nav__link--disabled {
  opacity: 0.3;
}

.title {
  font-size: 28px;
}

.button {
  padding: 10px;
  width: 180px;
  background-color: #6CA0C2;  
  font-family: inherit;
  border: none;
  border-bottom: 4px solid #426175;
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  opacity: 0.8;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }

  &.small {
    padding: 5px;
    width: auto;
    text-transform: none;
  }

}

.form__field {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & select,
  & input, 
  & textarea {
    padding: 5px;
    font-size: 16px;
    background-color: #f2f2f2;
    border: none;
    border-bottom: 1px solid #000000;
  }
  & textarea {
    padding-bottom: 13px;
    resize: none;
  }
  & label {
    align-self: end;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

}
.required::after {
  position: absolute;
  content: "*";
  color: red;
  top: 5px;
  right: 5px;
}
</style>

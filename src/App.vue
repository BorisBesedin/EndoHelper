<template>
  <div id="app">
    <div class="header">
      <div class="logo"></div>
      <div id="nav">
        <router-link class="nav-link" to="/">Главная</router-link>
        <router-link class="nav-link" to="/record">Создать протокол</router-link>
        <router-link class="nav-link" to="/about">Статьи</router-link>
      </div>
    </div>  
    
    <router-view class="content"/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  margin-top: 40px;
}

.header {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #e5e5e5;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 250px;
  height: 50px;
  background-image: url('../public/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}

#nav {
  padding-top: 30px;
  padding-bottom: 30px;

  a {
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 10px;    
    border-radius: 10px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }

    &.router-link-exact-active {
      color: green;
      transition: 0.3s ease-in-out;
    }
  }
}

.title {
  font-size: 28px;
}

.nav-link {
  margin-right: 20px;
}

.button {
  padding: 10px;
  width: 180px;
  background-color: green;
  border: none;
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
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
</style>

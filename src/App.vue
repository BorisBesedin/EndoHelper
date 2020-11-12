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
  color: #2c3e50;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}

.header {
  background-color: #3D97D1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-left: 20px;
  width: 250px;
  height: 50px;
  background-image: url('../public/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}

#nav {
  display: flex;

  a {
    display: block;
    padding: 25px;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
    }

    &.router-link-exact-active {
      background-color: #0A67A3;
      color: #ffffff;
      transition: 0.3s ease-in-out;
    }
  }
}

.title {
  font-size: 28px;
}

.button {
  padding: 10px;
  width: 180px;
  background-color: #0A67A3;  
  font-family: inherit;
  border: none;
  border-bottom: 4px solid #03416A;
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
</style>

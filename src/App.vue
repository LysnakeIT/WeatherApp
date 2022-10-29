<template>
<nav>
  <h4>Meteo - App</h4>
  <router-link to="/" class="btn-floating waves-effect waves-light red btn-back">
    <i class="material-icons">home</i>
  </router-link>
  <router-link to="/villes" class="btn-floating waves-effect waves-light red btn-villes">
    <i class="material-icons">location_city</i>
  </router-link>
</nav>
<router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row {
  margin-right: 0 !important;
}

nav {
  padding: 30px !important;
  overflow: hidden !important;
  background-color: #333 !important;
  top: 0 !important;
  width: 100% !important;
  line-height: 1.5 !important;
  height: 1% !important;
}

nav i, nav [class^="mdi-"], nav [class*="mdi-"], nav i.material-icons {
  display: inline-block !important;
  font-size: 1.6rem !important;
  height: none !important;
  line-height: 40px !important;
}

h4 {
  font-size: 2.28rem !important;
  line-height: 75% !important;
}

.btn-villes {
    position: absolute !important;
    top: 2%  !important;
    right: 5% !important;
}

.btn-back {
    position: absolute !important;
    top: 2% !important;
    left: 5% !important;
}

@media screen and (max-width: 767px) {
  nav {
    width: 103% !important;
  }
}
</style>

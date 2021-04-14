<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
  <router-view/>
  </div>
</template>

<style>
body{
  background-color: #f5f5f5 ;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.step-progress__step span{
  font-size: 26px !important;
}
.step-progress__step-label{
  font-size: 15px !important;
}
.step-progress__step:after{
  width: 50px !important;
  height: 50px !important;
}

</style>

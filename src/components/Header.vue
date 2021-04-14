<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        SmartFill
      </a>
      <h4>{{name}}</h4>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ['name'],
}
</script>

<style scoped>
  h4{
    color: aliceblue;
  }
</style>
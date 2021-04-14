<template>
  <div>
    <Header name="Home page"/>
    <div class="container">
      <router-link class="btn btn-primary addBtn" to="/Add">Добавить абитуриента</router-link>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import axios from "axios";

export default {
  name: 'Home',
  components: {
    Header,
  },
  data () {
    return {
      info: null
    }
  },
  mounted () {
    this.getStudents();
  },
  methods: {
    async getStudents(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const students = await axios.get('http://localhost:8081/api/students', config);
      this.info = students.data;
    }
  }
}
</script>

<style scoped>
  .addBtn{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 25px;
  }

</style>
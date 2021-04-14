<template>
  <div>
    <Header name="Admin panel"/>
    <br>

    <div class="container">
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <br>
      <br>
      <gep v-if="selected === 'gep'"/>
      <ep v-if="selected === 'ep'"/>
      <regions v-if="selected === 'region'"/>
      <cities v-if="selected === 'cities'"/>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";

import gep from '@/components/adminPanel/gep'
import ep from '@/components/adminPanel/ep'
import regions from '@/components/adminPanel/regions'
import cities from '@/components/adminPanel/cities'

export default {
  name: "Admin",
  components: {
    Header,
    gep,
    ep,
    regions,
    cities
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'gep', text: 'Группа образовательных программ' },
        { value: 'ep', text: 'Образовательные программы' },
        { value: 'cities', text: 'Города' },
        { value: 'region', text: 'Области'}
      ]
    }
  }
}
</script>

<style scoped>
  table tr td:nth-child(1){
    text-align: left;
  }
</style>
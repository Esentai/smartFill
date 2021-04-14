<template>
  <div>
    <b-button class="addBtn" v-b-modal.modal-1 variant="primary">Добавить город</b-button>
    <div>
      <b-modal id="modal-1" v-model="modalShow" title="Добавить город">
        <b-form-select v-model="selected" :options="options" placeholder="Выберите область"></b-form-select>
        <br>
        <br>
        <b-form-input v-model="id" placeholder="Код"></b-form-input>
        <br>
        <b-form-input v-model="name" placeholder="Название"></b-form-input>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="md" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="md" variant="primary" @click="handleOk">Добавить город</b-button>

        </template>
      </b-modal>
    </div>
    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Код</th>
        <th scope="col">Название</th>
        <th scope="col">Код области</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in info" :key="item.ID">
        <th scope="row">{{item.ID}}</th>
        <td>{{item.name}}</td>
        <td>{{item.region_id}}</td>
        <td><b-button  v-on:click="deleteEp(item.ID)" variant="danger">Удалить</b-button></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "cities",

  data () {
    return {
      info: null,
      id: '',
      name:'',
      modalShow: false,
      selected: null,
      options:[
        {
          value: null,
          text: "Выберите область",
          disabled: true
        }
      ],
    }
  },
  mounted () {
    this.getData();
    this.getRegions();
  },
  methods: {
    async getData(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const cities = await axios.get('http://localhost:5000/cities', config);
      this.info = cities.data;
    },
    async getRegions(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const regions = await axios.get('http://localhost:5000/regions', config);
      let k = 1;
      for (let i = 0; i < regions.data.length; i++) {
        if(regions.data[i].ID !== '01' && regions.data[i].ID !== '02' && regions.data[i].ID !== '03' )
          this.options[k] = {
            value: regions.data[i].ID,
            text: regions.data[i].name
          }
          k++;
      }
    },
    async handleOk(){
      if (this.id && this.selected && this.name){
        console.log("OK!",this.id, " ", this.selected, " ", this.name);

        await axios.post('http://localhost:5000/cities', {
          params: {
            ID: this.id,
            name: this.name,
            region_id: this.selected
          }
        })
        await this.getData();
        this.modalShow = false;
        this.id = '';
        this.name = '';
        this.selected = null;
      }else{
        alert("Заполните все поля")
      }
    },

    async deleteEp(id){
      console.log(id);
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      await axios.delete(`http://localhost:5000/cities/${id}`, config);
      await this.getData();
    }
  }
}

</script>

<style scoped>
.addBtn{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
</style>
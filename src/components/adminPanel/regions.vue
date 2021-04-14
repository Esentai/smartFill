<template>
  <div>
    <b-button class="addBtn" v-b-modal.modal-1 variant="primary">Добавить регион/город</b-button>
    <div>
      <b-modal id="modal-1" v-model="modalShow" title="Добавить регион/город">
        <b-form-input v-model="id" placeholder="Код"></b-form-input>
        <br>
        <b-form-input v-model="name" placeholder="Название"></b-form-input>
        <br>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="md" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="md" variant="primary" @click="handleOk">Добавить</b-button>

        </template>
      </b-modal>
    </div>
    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Код</th>
        <th scope="col">Название</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in info" :key="item.ID">
        <th scope="row">{{item.ID}}</th>
        <td>{{item.name}}</td>
        <td><b-button  v-on:click="deleteGep(item.ID)" variant="danger">Удалить</b-button></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "regions",

  data () {
    return {
      info: null,
      id: '',
      name:'',
      modalShow: false
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const regions = await axios.get('http://localhost:5000/regions', config);
      this.info = regions.data;
    },

    async handleOk(){
      if (this.id && this.name){
        console.log("OK!")
        await axios.post('http://localhost:5000/regions', {
          params: {
            ID: this.id,
            name: this.name,
          }
        })
        await this.getData();
        this.modalShow = false;
        this.id = '';
        this.name = '';
      }else{
        alert("Заполните все поля")
      }
    },

    async deleteGep(id){
      console.log(id);
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      await axios.delete(`http://localhost:5000/regions/${id}`, config);
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
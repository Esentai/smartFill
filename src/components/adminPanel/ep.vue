<template>
  <div>
    <b-button class="addBtn" v-b-modal.modal-1 variant="primary">Добавить ОП</b-button>
    <div>
      <b-modal id="modal-1" v-model="modalShow" title="Добавить ОП">
        <b-form-select v-model="selected" :options="options" placeholder="Выберите ГОП"></b-form-select>
        <br>
        <br>
        <b-form-input v-model="id" placeholder="ОП ID"></b-form-input>
        <br>
        <b-form-input v-model="ep_name" placeholder="Название"></b-form-input>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="md" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="md" variant="primary" @click="handleOk">Добавить ОП</b-button>

        </template>
      </b-modal>
    </div>
    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Название</th>
        <th scope="col">ID ГОП</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in info" :key="item.ID">
        <th scope="row">{{item.ID}}</th>
        <td>{{item.name}}</td>
        <td>{{item.ID_gep}}</td>
        <td><b-button  v-on:click="deleteEp(item.ID)" variant="danger">Удалить</b-button></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "ep",

  data () {
    return {
      info: null,
      id: '',
      ep_name:'',
      minn: null,
      modalShow: false,
      selected: null,
      options:[
        {
          value: null,
          text: "Выберите ГОП",
          disabled: true
        }
      ],
    }
  },
  mounted () {
    this.getEp();
    this.getGep();
  },
  methods: {
    async getEp(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const ep = await axios.get('http://localhost:5000/ep', config);
      this.info = ep.data;
    },
    async getGep(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const gep = await axios.get('http://localhost:5000/gep', config);
      console.log(gep);
      for (let i = 0; i < gep.data.length; i++) {
        this.options[i+1] = {
          value: gep.data[i].ID,
          text: gep.data[i].name
        }
      }
    },
    async handleOk(){
      if (this.id && this.selected && this.ep_name){
        console.log("OK!",this.id, " ", this.selected, " ", this.ep_name);

        await axios.post('http://localhost:5000/ep', {
          params: {
            ID: this.id,
            name: this.ep_name,
            ID_gep: this.selected
          }
        })
        await this.getEp();
        this.modalShow = false;
        this.id = '';
        this.ep_name = '';
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
      await axios.delete(`http://localhost:5000/ep/${id}`, config);
      await this.getEp();
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
<template>
  <div class="root">
    <h2>Create New Products</h2>
    <div v-for="error in errors">
      {{ error }}
    </div>
    <p>Name: <input type="text" v-model="newProductName"></p>
    <p>Description: <input type="text" v-model="newProductDescription"></p>
    <p>Price: <input type="text" v-model="newProductPrice"></p>
    <p>ImageUrl: <input type="text" v-model="newProductImageUrl"></p>
    <button v-on:click="makeNewProduct()">Add a new Product</button>
  </div>

</template>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newProductName: "",
      newProductDescription: "",
      newProductPrice: "",
      newProductImageUrl: "",
      errors: []
    };
  },
  created: function () {},
  methods: {
    makeNewProduct: function() {
      console.log("Making a new Product");

      var params = {
        name: this.newProductName,
        description: this.newProductDescription,
        price: this.newProductPrice,
        imageUrl: this.newImageUrl
      }

      console.log(params);
      //send data to api
      axios.post("/api/products/", params).then(response => {
        console.log(response.data);
        this.$router.push("/")
      }).catch(error => {
        console.log('things are not working')
        console.log('error.response.data.errors')
        this.errors = error.response.data.errors;
      });
    }
   }
  };
</script>
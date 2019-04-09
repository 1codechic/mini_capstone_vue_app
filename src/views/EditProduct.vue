<template>
  <div class="root">
    Edit Product
    <div v-for="error in errors">
      {{ error }}
    </div>
    <form v-on:submit.prevent="updateProduct()">
      <p>Name: <input type="text" v-model="product.name"></p>
      <p>Description: <input type="text" v-model="product.description"></p>
      <p>Price: <input type="text" v-model="product.price"></p>
      <p>ImageUrl: <input type="text" v-model="product.image_url"></p>
      <input type="submit" value="Update Product">
    </form>
      <button v-on:click="deleteProduct()">Delete Product</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      product: {
        name: "",
        description: "",
        price: "",
        image_url: "" 
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data)
      this.product = response.data;
    })
  },
  methods: {
    updateProduct: function() {
      console.log('Updating the Product');
      var params = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        imageUrl: this.product.image_url
      }
      console.log(params);
     
       axios.patch("/api/products/" + this.$route.params.id, params).then(response => {
              console.log('things are going well')
              console.log(response);
              this.$router.push("/products/" + this.$route.params.id)
            }).catch(error => {
              console.log('things are going poorly')
              console.log(error.response.data.errors)
              this.errors = error.response.data.errors;
            });
          },
          deleteProduct: function() {
            console.log('deleting the recipe...');
            // make an HTTP request using axios to the destroy action of my API
            axios.delete("/api/products/" + this.$route.params.id).then(response => {
              this.$router.push("/");
            })
          }
        }
      };
</script>
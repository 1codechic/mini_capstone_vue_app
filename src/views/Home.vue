<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>Name: <input type="text" v-model="newProductName"></p>
    <p>Description: <input type="text" v-model="newProductDescription"></p>
    <p>Price: <input type="text" v-model="newProductPrice"></p>
    <p>ImageUrl: <input type="text" v-model="newProductImageUrl"></p>
    <button v-on:click="makeNewProduct()">Add a new Product</button>

    
    <!-- <h1>Products: {{ products }}</h1> -->
    <div v-for="product in products">
      <p>{{ product.name}} </p>
      <!-- <p>{{ product.price}} </p> -->
      <img v-bind:src="product.image_url">
      <button v-on:click="toggleInfo(product)">Show more Info</button>  
      <div v-if="product === currentProduct">
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <p>Name: <input type="text" v-model="product.name"></p>
        <p>Description: <input type="text" v-model="product.description"></p>
        <p>Price: <input type="text" v-model="product.price"></p>
        <p>ImageUrl: <input type="text" v-model="product.image_url"></p>
        <button v-on:click="updateProduct(product)">Update the Product</button>
        <button v-on:click="deleteProduct(product)">Delete the Product</button>
      </div>
      <hr>
    </div>
  </div>
</template>

<style>
  img{
    width: 90px;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      products: [],
      newProductName: "",
      newProductDescription: "",
      newProductPrice: "",
      newProductImageUrl: "",
      currentProduct: {}
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    })
  },
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
      axios.post("/api/products", params).then(response => {
        console.log(response.data);
        this.products.push(response.data);
      });
    },
    toggleInfo: function(theProduct) {
      if (this.currentProduct === theProduct) {
        //Info is shown
        this.currentProduct = {};
      }
      else {
        //close the info
        this.currentProduct = theProduct;
      }
      console.log('toggling info ...');
    },
    updateProduct: function(theProduct){
      console.log(theProduct);
      console.log('Updating the Product');
      var params = {
        name: theProduct.name,
        description: theProduct.description,
        price: theProduct.price,
        imageUrl: theProduct.image_url
      };
      axios.patch("/api/products/" + theProduct.id, params).then(response => {
        console.log(response);
        theProduct = response.data;
      })
    },
    deleteProduct: function(theProduct) {
      console.log('deleting the product...');
      //make an http request using axios to delete the product
      axios.delete("/api/products/" + theProduct.id).then(response => {
        console.log(response);

        var index = this.products.indexOf(theProduct);
        this.products.splice(index, 1);
      })
    }
  }
};
</script>

<template>
  <div class="root">
    <p>This is the Product Page</p>
    <div v-for="product in products">
      <p>{{ product.name}} </p>
      <!-- <button v-on:click="toggleInfo(product)">Show more Info</button>   -->
      <router-link v-bind:to="'/products/' + product.id">See more info</router-link>
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
      currentProduct: {}
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    })
  },
  methods: {}
};
</script>

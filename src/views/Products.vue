<template>
  <div class="root">
    <p>This is the Product Page</p>

    <input type="text" v-model="titleFilter" list="titles" />
    <datalist id="name">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>

    <button v-on:click="setSortAttribute('name')">Sort by name</button>
    <button v-on:click="setSortAttribute('price')">Sort by price</button>

    <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-for="product in orderBy(products, sortAttribute, sortAsc)" v-bind:key="product.id">
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>

        <router-link v-bind:to="'/products/' + product.id">See more info</router-link>
        <hr />
      </div>
    </transition-group>
  </div>
</template>

<style>
img {
  width: 90px;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      products: [],
      sortAttribute: "name",
      nameFilter: "",
      sortAsc: 1,
      currentProduct: {}
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    });
  },
  methods: {
    setSortAttribute: function(attribute) {
      console.log(attribute);
      this.sortAttribute = attribute;
      if (this.sortAsc === 1) {
        this.sortAsc = -1;
      } else {
        this.sortAsc = 1;
      }
    }
  }
};
</script>

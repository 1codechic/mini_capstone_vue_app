<template>
  <div class="root">
    <h2>Show Product</h2>
    <p>{{ product.name}} </p>
    <img v-bind:src="product.image_url">
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>

    <router-link v-bind:to="'/products/' + product.id + '/edit'">Edit Product</router-link>
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
        image_url: ''
      }
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data)
      this.product = response.data;
    })
  },
  methods: {}
};
</script>
<template>
  <div class="home">
    <h1>{{ message }}</h1> 
  </div>  
</template>



<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  methods: {}
  };    
</script>

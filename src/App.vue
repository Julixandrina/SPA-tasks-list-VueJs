<template>
  <div id="app">
 <header>
   <navbar-header></navbar-header>
 </header>
  <main class="container">
     <router-view/>
  </main>

  <footer><footer-part></footer-part></footer>



  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default {
  components:{
    'navbar-header': Navbar,
    'footer-part': Footer,
  }

}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "./style.scss";



</style>

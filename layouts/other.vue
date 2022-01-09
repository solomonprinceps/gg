<template>
    <div class="otherslayout">
        <div class="navbar">
            <Mainavbar></Mainavbar>
            <!-- <Mobilenavbar></Mobilenavbar> -->
        </div>
        <div class="mobilenav">
            <Mobilenavbar></Mobilenavbar>
        </div>
        <div class="othercontent">
            <Nuxt />
        </div>
        
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "~/components/Footer.vue"
import Mainavbar from "~/components/Mainavbar.vue"
import Mobilenavbar from "~/components/Mobilenavbar.vue"
export default {
  components: {
    Footer,
    Mainavbar,
    Mobilenavbar
  }
}
</script>
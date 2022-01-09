<template>
    <div class="layoutbox container-fluid">
        <Nuxt />
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "~/components/Footer.vue"
export default {
  name: 'IndexPage',
  components: {
    Footer
  }
}
</script>
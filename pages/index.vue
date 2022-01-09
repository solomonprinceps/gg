<template>
  <!-- <Tutorial/> -->
  <div>
    <div class="mainbox">
      <Mainavbar></Mainavbar>
      <div class="maindash">
        <div class="leftcloud">
          
        </div>
        <div class="dimg"></div>

        <div class="rightcloud">
          
        </div>
        <div class="rimg"></div>
        <div class="textbackgorund">
          <div class="textcontainer">
            <h3> Stake and Win With Game Garoo</h3>
            <p>Stake at ease with your ethereum coin</p>
          </div>
        </div>
        
      </div>  
    </div>
    <div class="mobilebox">
      <Mobilenavbar></Mobilenavbar>
      <div class="dashmobile">
        <div class="leftspil"></div>
        <img class="leftimg" src="~/assets/img/mobileleft.png" />
        <div class="rightspil"></div>
        <img class="rightimg" src="~/assets/img/mobileright.png" />
        <div class="mobilecontent">
          <div class="content">
            <h4> Stake and Win With Game Garoo </h4>
            <p>Stake at ease with your ethereum coin</p>
            <button>
              Stake Now
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
import Mainavbar from '~/components/Mainavbar.vue'
import Mobilenavbar from '~/components/Mobilenavbar.vue'
export default {
  name: 'IndexPage',
  components: {
    Mainavbar,
    Mobilenavbar
  }
}
</script>

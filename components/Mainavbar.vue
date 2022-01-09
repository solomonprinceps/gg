<template>
    <div class="mainavbar">
        
        <div class="logo">
            <NuxtLink to="/">
                <img src="~/assets/img/logo.png" alt="Brand Logo">
            </NuxtLink>
        </div>
        
        <ul class="navcontent">
            <li>
                <NuxtLink to="/howtoplay"> How To Play </NuxtLink>
            </li>
            <li>
            <a href=""> Stake Logs </a>
            </li>
            <li>
            <a href=""> Game Session </a>
            </li>
        </ul>
        <div class="loginbtn">
            <button class="btn btnlogin" @click="showmenu">
            Login Wallet &nbsp;          
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.11279 1L7.11279 7L13.1128 1" stroke="#67D1FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <div id="menushow" @click="hidelogin" class="menushow hide">
            <div id="backmenu" class="wallets shadow">
                <ul>
                <li>META MAST</li>
                <li>WALLET CONNECT</li>
                </ul>
            </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    methods: {
    showmenu() {
      var element = document.getElementById('menushow');
      element.classList.remove('hide');
      element.classList.add('show');
    },
    hidelogin() {
      var element = document.getElementById('menushow');
      element.classList.remove('show');
      element.classList.add('hide');
    }
  }
}
</script>
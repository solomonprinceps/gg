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
                <NuxtLink to="/gameboard"> Game Board </NuxtLink>
            </li>
            <li>
                <a href=""> Stake Logs </a>
            </li>
            <li>
                <NuxtLink to="/gamesessions"> Game Session </NuxtLink>
            </li>
        </ul>
        <div class="loginbtn" v-if="!this.$auth.loggedIn">
            <button class="btn btnlogin" @click="showmenu">
            Login Wallet &nbsp;          
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.11279 1L7.11279 7L13.1128 1" stroke="#67D1FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <div id="menushow" @click="hidelogin" class="menushow hide">
                <div id="backmenu" class="wallets shadow">
                    <ul>
                        <li @click="loginmetamask">META MAST</li>
                        <li @click="loginWalletconnet">WALLET CONNECT</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="loginbtn" v-if="this.$auth.loggedIn">
            <button class="btn btnlogin" @click="showmenu">
             {{ this.$auth.user.etherum_address }} &nbsp;          
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.11279 1L7.11279 7L13.1128 1" stroke="#67D1FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <div id="menushow" @click="hidelogin" class="menushow hide">
                <div id="backmenu" class="wallets shadow">
                    <ul>
                        <li @click="logout">Log Out</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import swal from 'sweetalert';
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
        },
        async lateststake() {
            const params = {
                sessionid: this.sessions.sessionid,
                page_number: 10
            }
            await this.$axios.post(`customers/stake/getstakes`, params).then((res) => { 
                console.log(res.data.stakes.data)
            });
        },
        async logout() {
            await swal({
                title: "Confirm",
                text: "Are you sure you want to Log out ?",
                icon: "warning",
                button: "Yes",
            }).then((res) => {
                if (res == true) {
                    this.$moralis.User.logOut();
                    this.$auth.logout();
                    this.$router.go(this.$router.currentRoute)
                // this.$auth.logout();
                }
            });
        },
        async loginmetamask () {
            if (this.$moralis.User.current() != null) {
                 this.$moralis.User.logOut();
                return;
            }
            try {
                const user = await this.$moralis.authenticate();
                this.userLogin(user.get('ethAddress'));
            } catch (error) {
                swal("Error", "Error Occcoured Please reload", "error");
                console.log(87)
            }  
        },
        async userLogin(etherum_address) {
            try {
                let response = await this.$auth.loginWith('local', { data: { "etherum_address": etherum_address } })
                console.log(response)
                $nuxt.$emit('fetchdata')
            } catch (err) {
                console.log(err)
            }
        },
        async loginWalletconnet() {
            if (this.$moralis.User.current() != null) {
                // swal("error", "already login!", "success");
                 this.$moralis.User.logOut();
                return;
            }
            try {
                const user = await this.$moralis.authenticate({ 
                provider: "walletconnect", 
                mobileLinks: [
                    "rainbow",
                    "metamask",
                    "argent",
                    "trust",
                    "imtoken",
                    "pillar",
                ] 
                });
                this.userLogin(user.get('ethAddress'));
            } catch (error) {
                console.log(87)
            }  
        }    
    },
    computed: {

    }

}
</script>
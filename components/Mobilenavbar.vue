<template>
    <div class="mobilenav">
        <div v-b-toggle.sidebar-backdrop>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.7984 13.3333H4.79837" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.7984 8H4.79837" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.7984 18.6667H4.79837" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.7984 24H4.79837" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="mobilelogo">
          <img src="~/assets/img/logo.png" alt="Brand Logo">
        </div>

        <b-sidebar
            id="sidebar-backdrop"
            backdrop-variant="dark"
            width="220px"
            no-header
            backdrop
            shadow
        >
            <div class="px-3 pt-5">
                <div class="sbnav">                    
                    <svg v-b-toggle.sidebar-backdrop width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 8L8 24" stroke="#050F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 8L24 24" stroke="#050F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <div class="sibnav">
                        <div class="sidebar">
                            <NuxtLink to="/">Home</NuxtLink>
                            <NuxtLink to="/howtoplay">How To Play</NuxtLink>
                            <NuxtLink to="/gameboard"> Game Board </NuxtLink>
                            <NuxtLink to="/gamesessions"> Game Sessions </NuxtLink>
                            <NuxtLink to="/stakelog"> Game Sessions </NuxtLink>
                            <a v-b-toggle.my-collapse>Login Wallet</a>
                            <b-collapse id="my-collapse" v-if="!this.$auth.loggedIn">
                                <ul>
                                    <li @click="loginmetamask">Meta Mask</li>
                                    <li @click="loginWalletconnet">Wallet Connect</li>
                                </ul>
                            </b-collapse>
                            <a href="#contact">Contact</a>
                            <a href="#about">About</a>
                            <b-collapse id="my-collapse" v-if="this.$auth.loggedIn">
                                <ul>
                                    <li> {{ this.$auth.user.etherum_address }}</li>
                                    <li @click="logout">Logout</li>
                                </ul>
                            </b-collapse>
                        </div>
                    </div>
                </div>
            </div>
        </b-sidebar>

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
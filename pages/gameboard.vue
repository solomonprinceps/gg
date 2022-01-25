<template>
<div class="othercontentgame">
    <div class="howtoplay"> 
        <div class="container">
            <div class="row mb-2">
                <h3 class="headf unactivecolor">Session ID</h3>
            </div>
            <div class="row mb-2 headbox">
                <div class="col-md-12 lefthead">
                    <h4 class="float-left"> {{ sessions.sessionid }}</h4>
                    <h4 class="float-left">{{ timers }}</h4>
                </div>
            </div>
        </div>
        <div class="container my-3">
            <div class="row">
                <div class="col-xs-12 gamebox">
                    <div class="numbox" :id='`num${number}`' @click="selectNumber(number)" v-for="(number, index) in numbers" :key="index">
                        <span>{{number}}</span>
                    </div>
                    
                    <!-- <div class="numbox numselected">
                        <span>7</span>
                    </div>
                    <div v- class="numbox">
                        <span>8</span>
                    </div>
             -->
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row  mb-2">
                <h3 class="headf unactivecolor">Selected Number</h3>
            </div>
            <div class="row selectrows">

                <div class="grup" v-for="(chart, index) in charts" :key="index">
                    <div class="slb">
                        <span>{{ chart }}</span>
                    </div>
                    <div @click="removeNumber(chart)" class="slect">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                            <path d="M18 6L6 18" stroke="#2B9683" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6L18 18" stroke="#2B9683" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#2B9683"/>
                        </svg>
                    </div>
                </div>

            </div>
        </div>

        <div class="container">
            <div class="row py-2 mt-3">
                <h3 class="headf unactivecolor">Stake: {{ newstake.stakeAmount }} ETH</h3>
            </div>
            <div class="row py-2">
                <div class="col-md-6 p0">
                   <input type="number" v-model="newstake.stakeAmount" min="0" class="inputamount" />
                </div>
                <div class="col-md-6 p0">
                   <p class="text-left mb-0 pl-3">Possible Winning {{ calcwining(newstake.stakeAmount) }} ETH</p>
                   <div class="inlie">
                        <button class="btn btn-primary ml-3 text-right" v-if="loading == false" @click="makestake" type="button">Submit</button>
                        <button class="btn btn-primary ml-3 text-right" :disabled="loading" v-if="loading" type="button">Loading..</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>
    
</template>
<script>
import swal from 'sweetalert';
export default {
  layout: 'other',    
  created() {
    this.fetchnumbers()
    this.setcounter()
    this.$nuxt.$on('fetchdata', () => {
      this.lateststake()
    })
  },
  mounted() {
    const authdata = this.$authdata;
    this.lateststake();
  },
  data() {
    return {
      numbers: [],
      sessions: null,
      timers: '00 : 00 : 00',
      loading: false,
      show: false,
      charts: [],
      winings: 0,
      transactions: null,
      newstake: {
        stakeAmount: 0,
        sessionid: null,
        stakeNumber: null
      }
    }
  },
  async asyncData({params, $axios }) {
    const sessions = await $axios.post('customers/sessions/createsession')
    return { sessions: sessions.data.session }
  },
  methods: {
    showmodal(index) {
      const ind = 'mymodal'+index;
      console.log(ind)
      this.$refs[ind].show()
    },
    calcwining (amount) {
      let nummbercount =  this.charts.length;
      let winings = 0;
      if (nummbercount == 1) {
        winings = amount * 500;
      }
      if (nummbercount == 2) {
        winings = amount * 450;
      }
      if (nummbercount == 3) {
        winings = amount * 400;
      }
      if (nummbercount == 4) {
        winings = amount * 350;
      }
      if (nummbercount == 5) {
        winings = amount * 300;
      }
      return winings
    },
    titleCase(str) {
      return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
    },
    async lateststake() {
      const params = {
        sessionid: this.sessions.sessionid,
        page_number: 10
      }
      this.show = true
      await this.$axios.post(`customers/stake/getstakes`, params).then((res) => { 
        this.show = false
        console.log(res.data.stakes.data)
        this.transactions = res.data.stakes.data
      }).catch((err)  => {
        this.show = false
      });
    },
    async makestake() {
      if (this.$auth.loggedIn == false) {
        this.$toast.error(`You need to authenticate first.`, {
          position: 'top-right',
          duration: 3000
        });
        return; 
      }
      if (this.charts.length == 0) {
        this.$toast.error(`No number selected.`, {
          position: 'top-right',
          duration: 3000
        });
        return;
      }
      if (this.newstake.stakeAmount == 0) {
        this.$toast.error(`Stake Amount is required.`, {
          position: 'top-right',
          duration: 3000
        });
        return;
      }

      this.newstake.stakeNumber = JSON.stringify(this.charts);
      this.newstake.sessionid = this.sessions.sessionid
      this.newstake.stakeAmount = this.newstake.stakeAmount.toString()
      this.$moralis.enableWeb3()
      const options = {
        type: "native", 
        amount: this.$moralis.Units.ETH(this.newstake.stakeAmount), 
        receiver: "0x600065d5B05Dc6c95FEd1C8b44A4bE04a03EA151"
      }
      this.loading = true
      await this.$moralis.transfer(options).then((res) => {
        this.makestakebacked(res.transactionHash)
      }).catch((err) => {
        this.loading = false
        swal("error", "Try Again", "error");
      })
    },
    async makestakebacked(transactionHash) {
      const param = this.newstake
      param.transactionHash = transactionHash
      await this.$axios.post(`customers/stake/once`, this.newstake).then((res) => {
        this.loading = false
        this.$toast.success(`${res.data.message}`, {
          position: 'top-right',
          duration: 3000
        });
        this.removecolorclass()
        this.charts = []
        this.newstake.stakeAmount = 0
        this.lateststake()
      }).catch((err) => {
        this.loading = false
      });
    },
    removecolorclass() {
      this.charts.forEach(element => {
        document.getElementById("num"+element).classList.remove("numselected"); 
      });
    },
    removeNumber(chart) {
      document.getElementById("num"+chart).classList.remove("numselected"); 
      const chartId = this.charts.indexOf(chart);
      this.charts.splice(chartId, 1);;
    },
    selectNumber(num) {
      let chartlength = this.charts.length;
      let tata = this.charts.find((numb) => num == numb);
      if (tata != null) {
        this.$toast.error(`${num} already selected.`, {
          position: 'top-right',
          duration: 3000
        });
        return; 
      }
      if (chartlength == 5) {
        this.$toast.error('Maximum options is 5 ', {
          position: 'top-right',
          duration: 3000
        })
        return;
      }
      document.getElementById("num"+num).classList.add("numselected"); 
      this.charts.push(num)
    },
    async refreshasync() {
      await this.$nuxt.refresh()
    },
    countdownclock() {
      let now = new Date().getTime();
      let distance = ((this.sessions.endtime) * 1000 ) - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (hours < 0) {
        this.refreshasync();
      }
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.timers = `${hours} : ${minutes} : ${seconds}`
    },
    setcounter() {
      setInterval(()  => {
        let now = new Date().getTime();
        // Find the distance between now and the count down date
        let distance = ((this.sessions.endtime) * 1000 ) - now;
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timers = `${hours} : ${minutes} : ${seconds}`
      }, 1000);
    },
    fetchnumbers() {
      for (let index = 1; index < 31; index++) {
        // const element = array[index];
        this.numbers.push(index);
        
      }
    },
    async logout() {
      await this.$moralis.User.logOut();
      localStorage.removeItem("localAuth");
    },
    async getbalance() {
      const user = await this.$moralis.User.current()
      const ethadd = user.get("ethAddress");
      const options = { chain: 'Eth', address: ethadd, to_block: "10253391" }
      const balances = await this.$moralis.Web3API.account.getNativeBalance(options);
      console.log(balances);
    },

    async signup() {
      if (this.$moralis.User.current() != null) {
        swal("error", "already login!", "success");
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
        console.log(user)
        let autdata = JSON.stringify(user);
        localStorage.setItem('localAuth', autdata);
      } catch (error) {
        console.log(error)
      }
      
    }

  },
  computed: {
    userauth(){
      return this.$authdata;
    }
  }
}

</script>
<template>
<div class="othercontent">
    <div class="howtoplay"> 
        <b-overlay :show="tableloading" rounded="sm">
            <div style="min-height: 300px; width: 100%;">
                <div class="row mb-2 px-3">
                    <div class="col-md-6 col-sm-12 px-4">
                        <h3 class="headf text-left unactivecolor">Stake Log </h3>
                        <div class="form-group">
                            <input type="text" class="form-control" id="searchtext" v-model="stakeid" @change="loadx()" aria-describedby="emailHelp" placeholder="Search">
                            <small id="emailHelp" class="form-text text-muted">Search for ticket.</small>
                        </div>
                    </div>
                </div>

                <div class="row my-3 px-3">
                    <div  class="col-md-6 mb-3 px-4" v-for="(session, index) in sessions" :key="index">
                        <div class="gamesess">
                            <p class="gameid">{{ session.stakeId }} <span></span></p> 
                        </div>
                        <div class="gameblock">
                            <div v-if="session.stakeNumber.length != 0" class="firstblock mb-3">
                                <div v-for="(number, index) in session.stakeNumber" :key="index" class="boxnum">
                                    <span>{{ number}}</span>
                                </div>
                            </div>
                            <div class="pb-3">
                                <table>
                                    <tr class="mb-4">
                                        <td class="pr-3">Status</td>
                                        <td class="pl-3">
                                            <span class="badge badge-success" v-if="session.session.status == 'completed'">Completed</span>
                                            <span class="badge badge-primary" v-if="session.session.status == 'running'">Running</span>
                                            <span class="badge badge-primary" v-if="session.session.status == 'drawing'">Drawing</span>
                                        </td>
                                    </tr>
                                    <tr class="mb-4">
                                        <td class="pr-3">Game Session </td>
                                        <td class="pl-3">{{session.sessionid}}</td>
                                    </tr>
                                    <tr class="mb-3">
                                        <td class="pr-3">Start Date</td>
                                        <td class="pl-3">{{session.session.startime}}</td>
                                    </tr>
                                    <tr class="mb-4">
                                        <td class="pr-3">End Time</td>
                                        <td class="pl-3">{{session.session.endtime}}</td>
                                    </tr>
                                    
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-12 mt-3 px-3">
                        <div class="float-left">
                            <p class="">{{to}} of {{total}}</p>
                        </div>
                        <div class="float-right">
                            <button type="button" @click="paginate(prev_page_url)" class="btn btn-primary mr-3">Previous</button>
                            <button type="button" @click="paginate(next_page_url)" class="btn btn-primary">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </b-overlay>
    </div>
</div>
    
</template>
<script>
export default {
    layout: 'other',    
    middleware: 'auth',
    created() {
        this.loadx()
    },
    data(){
        return {
            sessions: [],
            links: [],
            stakeid: null,
            tableloading: false,
            next_page_url: null,
            prev_page_url: null,
            to: null,
            total: null
        }
    },
    
    methods: {
        async loadx() {
            this.tableloading = true
            await this.$axios.post('customers/stake/log', {page_number: 5, stakeid: this.stakeid}).then((res) => {
                this.tableloading = false
                console.log(res)
                this.sessions = res.data.stake.data
                this.links = res.data.stake.links
                this.next_page_url = res.data.stake.next_page_url,
                this.prev_page_url = res.data.stake.prev_page_url,
                this.to = res.data.stake.to,
                this.total = res.data.stake.total
            }).catch((err) => {
                this.tableloading = false
                console.log()
                if (err.response.data.status == "error") {
                    this.$toast.error(err.response.data.message, {
                        position: 'top-right',

                    });
                    return;        
                }
            })
        },
        async paginate(url) {
            if (url == null) {
                this.$toast.error(`No records available`, {
                    position: 'top-right',
                    duration: 3000
                });
                return; 
            }
            const urlink =  url.replace("http", "https").trim()
            this.tableloading = true
            await this.$axios.post(urlink, {page_number: 5}).then((res) => {
                this.tableloading = false
                // console.log(res)
                this.sessions = res.data.stake.data
                this.links = res.data.stake.links
                this.next_page_url = res.data.stake.next_page_url,
                this.prev_page_url = res.data.stake.prev_page_url,
                this.to = res.data.stake.to,
                this.total = res.data.stake.total
            })
        }
    }
    
}
</script>
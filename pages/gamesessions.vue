<template>
<div class="othercontent">
    <div class="howtoplay"> 
        <div class="container">
            
             <div class="row mb-2 px-3">
                <div class="col-md-6 col-sm-12 px-4">
                    <h3 class="headf text-left unactivecolor">Game Sessions </h3>
                </div>
            </div>
            
            <div class="row my-3 px-3">
                <div  class="col-md-6 mb-3 px-4" v-for="(session, index) in sessions" :key="index">
                    <div class="gamesess">
                        <p class="gameid">{{ session.sessionid }} <span></span></p> 
                    </div>
                    <div class="gameblock">
                        <div v-if="session.winning_number != null" class="firstblock mb-3">
                            <div v-for="(number, index) in session.winning_number" :key="index" class="boxnum">
                                <span>{{ number}}</span>
                            </div>
                        </div>
                        <div class="pb-3">
                            <table>
                                <tr class="mb-4">
                                    <td class="pr-3">Status</td>
                                    <td class="pl-3">
                                        <span class="badge badge-success" v-if="session.status == 'completed'">Completed</span>
                                        <span class="badge badge-primary" v-if="session.status == 'running'">Running</span>
                                        <span class="badge badge-primary" v-if="session.status == 'drawing'">Drawing</span>
                                    </td>
                                </tr>
                                <tr class="mb-3">
                                    <td class="pr-3">Start Date</td>
                                    <td class="pl-3">{{session.startime}}</td>
                                </tr>
                                <tr class="mb-4">
                                    <td class="pr-3">End Time</td>
                                    <td class="pl-3">{{session.endtime}}</td>
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
    </div>
</div>
    
</template>
<script>
export default {
    layout: 'other',    
    async asyncData({params, $axios }) {
        const sessions = await $axios.post('customers/sessions/log', {page_number: 5})
        return { 
            sessions: sessions.data.sessions.data,
            links: sessions.data.sessions.links,
            next_page_url: sessions.data.sessions.next_page_url,
            prev_page_url: sessions.data.sessions.prev_page_url,
            to: sessions.data.sessions.to,
            total: sessions.data.sessions.total
        }
    },
    data(){
        return {
            sessions: [],
            links: [],
            to: null,
            total: null,
            next_page_url: null,
            prev_page_url: null,
            tableloading: false
        }
    },
   
    methods: {
        async paginate(url) {
            if (url == null) {
                this.$toast.error(`No records available`, {
                    position: 'top-right',
                    duration: 3000
                });
                // this.$toast.error('Successfully authenticated')
                return; 
            }
            const urlink =  url.replace("http", "https").trim()
            this.tableloading = true
            await this.$axios.post(urlink, {page_number: 5}).then((res) => {
                this.tableloading = false
                // console.log(res)
                this.sessions = res.data.sessions.data
                this.links = res.data.sessions.links
                this.next_page_url= res.data.sessions.next_page_url,
                this.prev_page_url= res.data.sessions.prev_page_url,
                this.to= res.data.sessions.to,
                this.total= res.data.sessions.total
            })
        }
    }
    
}
</script>
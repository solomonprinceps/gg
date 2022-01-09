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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 8L8 24" stroke="#050F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 8L24 24" stroke="#050F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <div class="sibnav">
                        <div class="sidebar">
                            <NuxtLink to="/">Home</NuxtLink>
                            <NuxtLink to="/howtoplay">How To Play</NuxtLink>
                            <NuxtLink to="">Game Session</NuxtLink>
                            <a v-b-toggle.my-collapse>Login Wallet</a>
                            <b-collapse id="my-collapse">
                                <ul>
                                    <li>Meta Mask</li>
                                    <li>Wallet Connect</li>
                                </ul>
                            </b-collapse>
                            <a href="#contact">Contact</a>
                            <a href="#about">About</a>
                        </div>
                    </div>
                </div>
            </div>
        </b-sidebar>

    </div>
</template>
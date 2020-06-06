<template>
  <v-app :style="'background-color: '+( $vuetify.theme.isDark ? '#100815' : '#fff' )+';'">

    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndDown"
      color="primary"
      fixed
      app
    >
        <v-row>
          <v-col
            cols="12">
              <user></user>
          </v-col>
        </v-row>
    </v-app-bar>

    <v-container

        fill-height>
      <transition name="slide-in-down" appear appear-active-class="animate__animated animate__bounceIn">
        <v-row
          justify="center"
          :align="( $vuetify.breakpoint.mdAndDown ) ? 'center' : 'start'">
          <v-col 
            class="hidden-md-and-down"
            md="12"
            lg="3"
            cols="12">
              <navigation></navigation>
          </v-col>

          <v-col
              class="mainDiv"
              align-center
              :style="'background-image: url('+require('@/assets/images/'+( $vuetify.theme.isDark ? 'dark' : 'light' )+'.png')+')'"
              md="12"
              lg="9"
              cols="12">
              <v-scale-transition 
                hide-on-leave
                leave-absolute
              >
                <router-view transition="scale-transition"></router-view>
              </v-scale-transition>
            </v-col>
        </v-row>
      </transition>
    </v-container>

    <bottom-navigation></bottom-navigation>

  </v-app>
</template>
<style>

  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css";

  .mainDiv {
    background-size: contain;
    min-height: 700px;
    background-position: 50%;
  }

  @media (max-width: 600px){
    .mainDiv {
        background-attachment: fixed;
    }

  }
</style>
<script>

import navigation from '@/components/navigation.vue'
import user from '@/components/user.vue'
import bottomNavigation from '@/components/bottomNavigation.vue'

export default {
  name: 'Home',
  components : {
    navigation,
    bottomNavigation,
    user
  }
}
</script>

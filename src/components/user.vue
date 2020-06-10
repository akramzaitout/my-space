<template>
    <v-list 
        color="transparent">
        <v-list-item>
          <v-list-item-avatar
            size="60" 
            left
          >
            <v-img 
              
              contain 
              :src="require('@/assets/logos/'+( $vuetify.theme.isDark ? 'dark' : 'light' )+'.png')"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold title white--text">My Space</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon class="mt-3" @click="toggleDarkMode" >mdi-brightness-{{ (isDark) ? '4' : '7' }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
</template>

<script>

//$vuetify.theme.dark = !$vuetify.theme.dark
//$vuetify.theme.isDark

import { mapActions, mapGetters , mapMutations } from 'vuex'
export default {
    name : 'user',
    computed: {
      ...mapGetters( ['isDark'] )
    },
    methods: {
      ...mapActions( [ 'toggleDarkMode' ] ),
      ...mapMutations( 'home', [
        'setPageName',
      ]),
    }
}
</script>
<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
      v-model="snackbar.status"
      :bottom="!$vuetify.breakpoint.mdAndDown"
      :top="$vuetify.breakpoint.mdAndDown"
      :vertical="$vuetify.breakpoint.mdAndDown"
      :timeout=" ($vuetify.breakpoint.mdAndDown) ? 1000 : 3000"
    >
      {{ snackbar.text }}
      <v-btn
        color="blue"
        text
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    ...mapState( 'home' , [
      'snackbar'
    ]),
    ...mapState( ['isDark'] )
  },
  methods:{
    ...mapMutations( 'home', [
      'closeSnackbar'
    ])
  },
  created :function(){
    this.$vuetify.theme.dark = this.isDark;
    let color = this.$vuetify.theme.themes[ this.$vuetify.theme.isDark ? 'dark' : 'light' ].primary;
    document.querySelector('meta[name="theme-color"]').setAttribute("content", color );
  }
};
</script>

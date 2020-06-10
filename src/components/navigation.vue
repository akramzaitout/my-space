<template>
    <v-card
      :min-height="windowHeight-50"
      v-resize="onResize"
      style="position: fixed;"
      outlined
      color="primary">

      <user></user>

      <div class="pa-2">
        <v-btn 
        color="secondary"
        class="mb-4 black--text" 
        rounded
        elevation="4"
        large
        block
        @click="openDialog('Add')"
        v-show="pageName != null" >
          Add New {{  pageName }}
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-list rounded
        color="transparent white--text">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="'/' + (item.title).toLowerCase()"
          @click="setPageName(item.name)"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <action-note-component v-if="pageName=='note'" ></action-note-component>
      <action-task-component v-else-if="pageName=='task'" ></action-task-component>
      <action-event-component v-else-if="pageName=='event'" ></action-event-component>

    </v-card>
</template>

<script>

  import { mapMutations , mapState , mapActions } from 'vuex';
  import Router from '@/router/'; 

  import navItems from '@/navItems.json'

  import user from '@/components/user.vue'

  import actionNoteComponent from '@/components/actions/note'
  import actionTaskComponent from '@/components/actions/task'
  import actionEventComponent from '@/components/actions/event'

  export default {
    name : "navigation",
    components : {
      actionNoteComponent,
      actionTaskComponent,
      actionEventComponent,
      user
    },
    data: () => ({
      isDark:false,
      navItems,
      windowHeight:0
    }),
    methods : {
      onResize() {
        this.windowHeight = window.innerHeight
      },
      ...mapMutations( 'home', [
        'setPageName',
      ]),
      ...mapActions( 'home' , ['openDialog'] )
    },
    computed : {
      isDarkMode() {
        console.log( this.$vuetify.theme.isDark );
        return false;
      },
      ...mapState( 'home' , [
        'pageName',
        'snackbar',
      ])
    },
    created:function() {
      this.setPageName(Router.currentRoute.name);
    },
    mounted: function(){
      this.onResize();
    },
    
  }
</script>
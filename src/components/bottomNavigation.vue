<template>
    <v-bottom-navigation 
        class="hidden-lg-and-up"
        background-color="primary"
        app>
            <v-btn 
              v-for="item in navItems"
              :key="item.title"
              :to="'/' + (item.title).toLowerCase()"
              :value="item.title"
              @click="setPageName(item.name)"
              link>
              <span>{{item.title}}</span>
              <v-icon>mdi-{{item.icon}}</v-icon>
            </v-btn>
            <v-btn 
                value="Add"
                color="secondary"
                rounded
                @click="openDialog('Add')"
                v-show="pageName != null" >
              <span>Add</span>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
    </v-bottom-navigation>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';
import navItems from '@/navItems.json'

export default {
    name : 'bottomNavigation' ,
    data : () => ({
        navItems
    }),
    methods: {
        ...mapActions('home', [ 
            'openDialog' 
        ]),
        ...mapMutations( 'home', [
            'setPageName',
        ]),
    },
    computed: {
        ...mapState('home', [ 
            'pageName'
        ])
    }
}
</script>
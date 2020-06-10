<template>
  <v-row
    :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')">
      <v-col
        v-if="tasks.length > 0" 
        cols="12">
          <v-card
            elevation="3"
          >
            <v-row
              align="center"
              justify="center">
                <v-col 
                  class="pl-10"
                  md="10"
                  cols="9">
                    <span class="title">My Tasks ({{ inComplitedTaskes }})</span> 
                </v-col>
                    <v-col 
                      md="2"
                      cols="3"
                    >
                        <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="7"
                            :value="tasksProgress"
                            color="helperColor">
                            {{ tasksProgress }}
                        </v-progress-circular>
                    </v-col>
                </v-row>
          </v-card>
        </v-col>
        <v-col
            class="mb-12"
            cols="12">
            <v-card
              class="pa-5">
                <v-list
                  color="transparent"
                  subheader
                  two-line
                  flat
                  rounded>
                  <v-list-item-group multiple >
                    <v-list-item
                        v-for="(task,index) in tasks" 
                        color="black"
                        :key="index">

                        <v-list-item-action
                          @click="toggleTask(task)"
                        >
                          <v-checkbox
                            v-model="task.isDone"
                            color="secondary"
                            readonly
                          ></v-checkbox>
                        </v-list-item-action>
                        
                        <v-list-item-content 
                          :style="( task.isDone ) ? 'text-decoration: line-through;':''"
                          @click="toggleTask(task)"
                        >
                          <v-list-item-title>{{task.title}}</v-list-item-title>
                          <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn icon>
                            <v-icon 
                            color="grey lighten-1"
                            @click="deleteTask(task)"
                            >
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>

                    </v-list-item>

                  </v-list-item-group>
                </v-list>
                <span 
                  v-if="tasks.length <= 0" 
                  class="font-weight-bold headline ma-10"
                > 
                  You have no tasks {{ ($vuetify.theme.isDark )  ? '🤷' : '🤷‍♂️' }}
                </span>
            </v-card>
        </v-col>
  </v-row>
</template>
<script>

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name:"Tasks",
    data : ()=>({
        value : 20
    }),
    computed: {
        tasksProgress :function() {
            if(this.tasks.length <= 0){
              return 0;
            } else {
              return Math.ceil( this.tasks.reduce( (result,item) =>  result+(item.isDone==true ? 1 : 0) , 0) * 100 / this.tasks.length);
            }
            
        },
        inComplitedTaskes: function(){
          return this.tasks.reduce( (result,item) =>  result+(item.isDone== false ? 1 : 0) , 0);
        },
        ...mapState( 'task' , [ 'tasks' ] )
    },
    methods:{
      ...mapMutations( 'task' , [ 
        'toggleTask',
        ]),
      ...mapActions( 'task' , [ 'deleteTask' ] )
    }
}
</script>
    <template>
      <v-row justify="center">
        <v-dialog 
            v-model="taskDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            max-width="600px"
            persistent>
          <v-card>

            <v-card-title>
              <span class="text-capitalize headline">Add task</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-alert v-show="addTaskError != null" type="error">
                                {{ addTaskError }}
                            </v-alert>
                        </v-col>

                        <v-col cols="12">
                            <v-form
                                ref="taskForm"
                                v-model="valid"
                                lazy-validation>
                                    <v-text-field
                                      label="Task Title"
                                      @change="setTaskTitle"
                                      :value="taskTitle"
                                    ></v-text-field>
                                    <v-textarea
                                        label="Task Content"
                                        :value="taskText"
                                        @change="setTaskText"
                                        auto-grow
                                        clearable
                                        counter
                                        placeholder
                                        :rules="[v => !!v || 'you can\'t let this empty']"
                                        required
                                        row-height="9"
                                    ></v-textarea>   

                            </v-form>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
              <v-btn color="blue darken-1" text @click="validate">add</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
  </v-row>
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name : "action-task",
    data : () => ({
        valid: null
    }),
    computed : {
        ...mapState( 'task' , [ 
            'taskTitle',
            'taskText',
            'addTaskError', 
            'taskDialog' 
        ])
    },
    methods : {
        validate() {
            if( this.valid != null ) {
                if( this.$refs.taskForm.validate() ) {
                  this.createTask();
                }
            }
        },
        ...mapMutations( 'task' , [ 
            'setTaskTitle',
            'setTaskText',
            'closeDialog' 
        ]),
        ...mapActions( 'task' , [ 
            'createTask' ,
            'editTask' 
        ])
    },
    watch : {
        taskDialog : function(value) {
            if(value==true && this.valid != null) {
                this.$refs.taskForm.resetValidation();
            }
        }
    }
}
</script>
    <template>
      <v-row justify="center">
        <v-dialog 
            v-model="eventDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            max-width="600px"
            persistent>
          <v-card>

            <v-card-title>
              <span class="text-capitalize headline">{{ eventDialogMode }} event</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-form
                            ref="eventForm"
                            v-model="valid"
                            lazy-validation>

                            <v-col v-if="eventDialogMode == 'add' " class="d-flex" cols="12">
                                <v-select
                                :items="'party,birthday,work,travel,meeting,doctor visit,other'.split(',')"
                                :rules="[v => !!v || 'you can\'t let this empty']"
                                required
                                :value="eventType"
                                @change="setEventType"
                                label="type"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    :value="eventDescription"
                                    @change="setEventDescription"
                                    auto-grow
                                    clearable
                                    counter
                                    placeholder
                                    :rules="[v => !!v || 'you can\'t let this empty']"
                                    required
                                    row-height="9"
                                    label="description"
                                ></v-textarea>     
                                
                            </v-col>

                            <v-col cols="12">
                                <v-date-picker
                                    :rules="[v => !!v || 'you can\'t let this empty']"
                                    :value="eventDate"
                                    @change="setEventDate"
                                    full-width
                                    show-current
                                    required
                                    :landscape="$vuetify.breakpoint.smAndUp"
                                    class="mt-4"
                                ></v-date-picker>
                            </v-col>
                        </v-form>

                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
              <v-btn color="blue darken-1" text @click="validate">{{ eventDialogMode }}</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
  </v-row>
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name : "action-event",
    data : () => ({
        valid: null,
        date:null
    }),
    computed : {
        ...mapState( 'event' , [ 
            'eventType',
            'eventDescription',
            'eventDate',
            'eventDialogMode',
            'eventDialog' 
        ])
    },
    methods : {
        validate() {
            if( this.valid != null ) {
                if( this.$refs.eventForm.validate() ) {
                    if( this.eventDialogMode == 'add' ){
                         this.createEvent();
                    } else {
                         this.editEvent();
                    }
                   
                }
            }
        },
        ...mapMutations( 'event' , [ 
            'setEventType',
            'setEventDescription',
            'setEventDate',
            'closeDialog' 
        ]),
        ...mapActions( 'event' , [ 
            'createEvent' ,
            'editEvent' 
        ])
    },
    watch : {
        eventDialog : function(value) {
            if(value==true && this.valid != null) {
                this.$refs.eventForm.resetValidation();
            }
        }
    }
}
</script>
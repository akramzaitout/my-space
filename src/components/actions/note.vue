    <template>
      <v-row justify="center">
        <v-dialog 
            v-model="noteDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            max-width="600px"
            persistent>
          <v-card>

            <v-card-title v-show="noteDialogMode != 'read'">
              <span class="text-capitalize headline">{{ noteDialogMode }} note</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-alert v-show="addNoteError != null" type="error">
                                {{ addNoteError }}
                            </v-alert>
                        </v-col>

                        <v-col cols="12">
                            <v-form
                                ref="noteForm"
                                v-model="valid"
                                lazy-validation>
                                    <v-textarea
                                        :value="noteText"
                                        @change="setNoteText"
                                        auto-grow
                                        :clearable="noteDialogMode != 'read'"
                                        :counter="noteDialogMode != 'read'"
                                        :readonly="noteDialogMode == 'read'"
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
              <v-btn color="blue darken-1" v-show="noteDialogMode != 'read'" text @click="validate">{{ noteDialogMode }}</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
  </v-row>
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name : "action-note",
    data : () => ({
        valid: null
    }),
    computed : {
        ...mapState( 'note' , [ 
            'noteText',
            'addNoteError', 
            'noteDialogMode',
            'noteDialog' 
        ])
    },
    methods : {
        validate() {
            if( this.valid != null ) {
                if( this.$refs.noteForm.validate() ) {
                    if( this.noteDialogMode == 'add' ){
                         this.createNote();
                    } else {
                         this.editNote();
                    }
                   
                }
            }
        },
        ...mapMutations( 'note' , [ 
            'setNoteText',
            'closeDialog' 
        ]),
        ...mapActions( 'note' , [ 
            'createNote' ,
            'editNote' 
        ])
    },
    watch : {
        noteDialog : function(value) {
            if(value==true && this.valid != null) {
                this.$refs.noteForm.resetValidation();
            }
        }
    }
}
</script>
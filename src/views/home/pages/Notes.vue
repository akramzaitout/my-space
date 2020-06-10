<template>
<div>

    <v-row
        v-if="notes.length > 0" 
        :justify="($vuetify.breakpoint.lgAndUp) ? 'start' : 'center' "
        :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')">

            <v-col 
                v-for="(note,index) in currentNotes"
                :key="index"
                :ref="'note-'+index"
                class="d-flex animate__animated animate__faster"
                sm="6"
                lg="4"
                md="3"
                cols="12"
            >
                <v-card  
                    elevation="7"
                    height="100%"
                    width="100%"
                    class="pa-5">
                    <v-card-text 
                        @click="openReadDialog(note)"
                        :style="( $vuetify.breakpoint.mdAndUp ) ? 'min-height:163.15px' : ''"
                    > 
                        {{ getTextContent(note.content) }} 
                    </v-card-text>

                    <v-card-actions>
                        <v-row
                            align="center"
                            justify="center"
                        >
                            
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon @click="togglePinNote(note)" small v-on="on">{{ (note.isPin) ? "mdi-pin-off" : "mdi-pin" }}</v-icon>
                                </template>
                                <span>{{ (note.isPin) ? "Unpin" : "Pin" }}</span>
                            </v-tooltip>

                            <div class="mx-2"></div>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon @click="openEditDialog(note)" small v-on="on">mdi-pencil</v-icon>
                                </template>
                                <span>Edit</span>
                            </v-tooltip>

                            <div class="mx-2"></div>
                                <v-btn
                                    color="secondary"
                                    class="black--text"
                                    small
                                    depressed
                                    @click="deletingNote(note,index)"
                                >
                                    <v-icon left>mdi-delete</v-icon>
                                    Delete
                                </v-btn>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-col>
  
    </v-row>

    <v-row 
    :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')"
    v-else>
        <v-col 
            cols="12">
             <v-hover>
                <template v-slot="{ hover }">
                    <v-card 
                    :elevation="(hover) ? 24 : 12"
                    class="pa-5">
                        <span class="font-weight-bold headline ma-10"> You have no notes {{ ($vuetify.theme.isDark )  ? '🤷' : '🤷‍♂️' }}</span>
                    </v-card>
                </template>
            </v-hover>
        </v-col>
    </v-row>

    <div v-show="notes.length > 0" class="text-center">
        <v-pagination
        v-model="page"
        :length="pagesLength"
        color="helperColor"
        circle
        ></v-pagination>
    </div>
</div>
</template>
<script>

import { mapGetters , mapActions, mapMutations } from 'vuex'

export default {
    name:"Notes",
    data : () => ({
        page : 1
    }),
    methods: {
        deletingNote(note , index){
            this.$refs['note-'+index][0].classList.add("animate__bounceOut");
            setTimeout( () =>{
                this.deleteNote(note);
                this.$refs['note-'+index][0].classList.remove("animate__bounceOut");
            } , 500 );
        },
         getTextContent(str) {
             return str.slice(0,150) + ( (str.length > 150) ? "..." : "" ) ;
         },
         ...mapActions( 'note' , [ 
            'deleteNote',
            'togglePinNote' 
        ] ),
         ...mapMutations( 'note' , [ 
            'openEditDialog' ,
            'openReadDialog' 
        ])
    },
    computed: {
        pageElements: function() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 4;
                case 'sm': return 4;
                case 'md': return 8;
                case 'lg': return 6;
                case 'xl': return 12;
                default:return 0;
            }
        },
        currentNotes: function() {
            return this.notes.slice( this.page*(this.pageElements) - this.pageElements , this.page*(this.pageElements)  );
        },
        pagesLength: function() {
            return  Math.ceil(this.notes.length/this.pageElements);
        },
        ...mapGetters( 'note' , [ 'notes' ])
    },
    watch: {
        pagesLength: function() {
            this.page = (this.page > this.pagesLength && this.pagesLength != 0 ) ? this.pagesLength : this.page;
        }
    }
}
</script>
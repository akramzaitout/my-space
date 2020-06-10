<template>
<div>

    <v-row
        v-if="events.length > 0" 
        :justify="($vuetify.breakpoint.lgAndUp) ? 'start' : 'center' "
        :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')">

            <v-col 
                v-for="(event,index) in currentEvents"
                :key="index"
                :ref="'event-'+index"
                class="d-flex animate__animated animate__faster"
                sm="6"
                lg="4"
                md="3"
                cols="12">
                <v-card  
                    elevation="15"
                    height="100%"
                    width="100%"
                    class="pa-5"
                >

                    <v-card-title class="font-weight-bold text-capitalize">
                        <v-icon class="mr-2">mdi-{{event.icon}}</v-icon>
                        {{ event.type }}   
                    </v-card-title>
                    <v-card-text>
                        {{ event.description }}
                    </v-card-text>

                    <v-list 
                        color="transparent"
                        disabled  
                        rounded
                        tile
                        dense
                    >
                        <v-list-item-group color="primary">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-calendar-plus</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ event.added_date | formatDate }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item 
                                class="v-item--active v-list-item--active" 
                                :color="(event.status == 'done') ? 'black' : 'amber darken-3'"
                            > 
                                <v-list-item-icon >
                                    <v-icon>mdi-{{ (event.status != 'done') ? 'calendar-clock' : 'calendar-check' }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ event.event_date | formatDate }} {{ (event.status == 'done') ? '(OLD)' : ' ' }} </v-list-item-title> 
                                    <v-list-item-subtitle v-if="(event.status != 'done')">
                                      Left  {{ event.days }} day{{ (event.days >= 2) ? 's' : '' }}
                                    </v-list-item-subtitle>  
                                </v-list-item-content>
                            </v-list-item>
                            
                        </v-list-item-group>
                    </v-list>

                    <v-card-actions>
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <template v-if="event.status == 'done'">
                                    <v-btn
                                    color="red darken-2"
                                    class="black--text"
                                    small
                                    depressed
                                    @click="deletingEvent(event.id,index)"
                                >
                                    <v-icon left>mdi-delete</v-icon>
                                    Delete
                                </v-btn>
                            </template>

                            <template v-else>
                                <v-btn
                                    color="secondary"
                                    class="black--text"
                                    small
                                    depressed
                                    @click="openEditDialog(event)"
                                >
                                    <v-icon left>mdi-pencil</v-icon>
                                    Edit
                                </v-btn>

                                <div class="mx-2"></div>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="helperColor"
                                            class="black--text"
                                            small
                                            depressed
                                            @click="setEventDone(event.id)"
                                            v-on="on"
                                        >
                                            <v-icon left>mdi-check</v-icon>
                                            Done
                                        </v-btn>
                                    </template>
                                    <span>Done Before Date</span>
                                </v-tooltip>

                            </template>



                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
  
    </v-row>

    <v-row 
        :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')"
        v-else
    >
        <v-col 
            class="mb-12"
            cols="12">
             <v-hover>
                <template v-slot="{ hover }">
                    <v-card 
                    :elevation="(hover) ? 24 : 12"
                    class="pa-5">
                        <span class="font-weight-bold headline ma-10"> You have no events {{ ($vuetify.theme.isDark )  ? '🤷' : '🤷‍♂️' }}</span>
                    </v-card>
                </template>
            </v-hover>
        </v-col>
    </v-row>

    <div 
        v-show="events.length > 0" 
        class="text-center"
    >
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

import { mapGetters, mapMutations } from 'vuex'

export default {
    name:"Events",
    data : () => ({
        page : 1,
    }),
    methods: {
        deletingEvent(eventId , index){
            this.$refs['event-'+index][0].classList.add("animate__bounceOut");
            setTimeout( () =>{
                this.deleteEvent(eventId);
                this.$refs['event-'+index][0].classList.remove("animate__bounceOut");
            } , 500 );
        },
        ...mapMutations( 'event' , [ 
            'openEditDialog',
            'setEventDone' ,
            'deleteEvent' 
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
        currentEvents: function() {
            return this.events.slice( this.page*(this.pageElements) - this.pageElements , this.page*(this.pageElements)  );
        },
        pagesLength: function() {
            return  Math.ceil(this.events.length/this.pageElements);
        },
        ...mapGetters( 'event' , [ 'events' ])
    },
    watch: {
        pagesLength: function() {
            this.page = (this.page > this.pagesLength && this.pagesLength != 0 ) ? this.pagesLength : this.page;
        }
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
            let date = new Date(value);
            return (date.getMonth() + 1) + "/" +  date.getDate() + "/" +  date.getFullYear();
        }
    }
}
</script>
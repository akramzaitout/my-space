<template>
<div>
    <v-row
        class="pa-12"
        :justify="($vuetify.breakpoint.lgAndUp) ? 'start' : 'center' "
        :class="(!$vuetify.breakpoint.mdAndDown ? 'mt-12' : '')">
            <v-col 
                v-if=" unfinishedTasksLength > 0 "
                cols="16"
            >
                <v-alert
                    elevation="6"
                    colored-border
                    color="primary"
                    icon="mdi-clock-fast"
                    border="left"
                >
                You have {{ unfinishedTasksLength }} unfinished task{{ (unfinishedTasksLength >= 2 ) ? 's' : '' }} !
                </v-alert>
            </v-col>
            <v-col 
                v-if=" incompliteEventsLength > 0 "
                cols="12"
            >
                <v-card   
                    color="divColor"          
                    class="pa-10"
                    width="100%"
                >
                    
                    <v-card-title>
                       <v-icon class="mr-3">mdi-calendar-clock</v-icon> Close dates ({{ incompliteEventsLength }})
                    </v-card-title>

                        <v-list 
                            v-if="incompliteEventsLength > 0"
                            color="transparent"
                            rounded
                            tile
                            dense
                        >
                            <v-list-item-group color="primary">

                                <v-list-item 
                                    v-for="(event , i ) in incompliteEvents"
                                    :key="i"
                                > 
                                    <v-list-item-icon >
                                        <v-icon>mdi-{{event.icon}}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ event.event_date | formatDate }}</v-list-item-title> 
                                        <v-list-item-subtitle>
                                            {{ event.description }}
                                        </v-list-item-subtitle> 
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list-item-group>
                        </v-list>

                </v-card>
            </v-col>
    </v-row>
</div>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
    name:"first-page",
    computed : {
        ...mapGetters('note', ['notesLength']),
        ...mapGetters('task', ['unfinishedTasksLength']),
        ...mapGetters( 'event' , [ 
            'incompliteEventsLength' , 
            'incompliteEvents' 
        ] )
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
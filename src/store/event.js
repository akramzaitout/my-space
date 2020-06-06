//import json_data from '@/MOCK_DATA.json'

import Vue from 'vue';

const getIcon = ( type ) => {
    switch (type) {
        case 'travel': return 'wallet-travel';
        case 'birthday': return 'cake';
        case 'meeting': return 'account-multiple';
        case 'work': return 'presentation';
        case 'doctor visit': return 'needle';
        default : return 'calendar-blank';
    }
}

export default {
    namespaced: true,
    state: {        
        eventType :null,
        eventDescription :null,
        eventDate :null,
        eventDialog : false ,
        eventDialogMode: 'add',
        currentEvent : null,
        events : [],
    },
    getters : {
        events(state) {
            return state.events
            .map( (event) => 
                ({ ...event,
                    status : (new Date(event.event_date).getTime() <= new Date().getTime()) ? 'done' : 'still' ,
                    icon : getIcon(event.type),
                    days : (Math.ceil(( new Date(event.event_date) - new Date() ) / ( 1000*60*60*24 )))
            }))
            .sort( (a,b) => (a.days == b.days)? 0 : (a.days < b.days) ? -1 : 1 )
            .sort( (a,b) => (a.days < 0 || b.days < 0) ? -1 : 0 );
        },
        incompliteEventsLength(state) {
            return state.events
            .filter( (event) => {
                let daysCount = (Math.ceil(( new Date(event.event_date) - new Date() ) / ( 1000*60*60*24 )));
                return daysCount < 62 && daysCount > 0;
            } ).length;
        },
        incompliteEvents(state) {
            return state.events
            .filter( (event) => {
                let daysCount = (Math.ceil(( new Date(event.event_date) - new Date() ) / ( 1000*60*60*24 )));
                return daysCount < 62 && daysCount > 0;
            } )
            .map( (event) => ({ ...event , icon : getIcon( event.type ) }) );
        },
    },
    mutations: {
        setEventType(state , type){
            state.eventType = type;
        },
        setEventDescription(state , description){
            state.eventDescription = description;
        },
        setEventDate(state , date){
            state.eventDate = date;
        },
        setEventDone(state , id){
            state.events.find(event => event.id === id).event_date = new Date(); 
        },
        deleteEvent(state , id){
            state.events.splice( state.events.findIndex( (event) => event.id === id) , 1 );
        },
        appendEvent( state ) {
            let event = {
                id: state.events.length+1,
                type: state.eventType,
                description: state.eventDescription,
                added_date: new Date(),
                event_date: state.eventDate || new Date()
            };
            state.events.push( event );
        },
        editCurrentEventContent( state ){
            let selectedEvent = state.events[ state.events.findIndex( (event) => event.id === state.currentEvent.id) ];
            Vue.set(  selectedEvent , 'description' , state.eventDescription);
            Vue.set(  selectedEvent , 'event_date' , state.eventDate);
        },
        openEditDialog( state , event ) {
            state.eventType = event.type;
            state.eventDescription = event.description;
            state.eventDate = event.event_date;
            state.currentEvent = event ;
            state.eventDialogMode = 'edit';
            state.eventDialog = true;
        },
        openAddDialog( state ) {
            state.eventType = null;
            state.eventDescription = null;
            state.eventDate = null;
            state.currentEvent = {};
            state.eventDialogMode =  'add';
            state.eventDialog = true;
        },
        closeDialog( state ) {
            state.eventDialog = false;
        }
    },
    actions: {
        createEvent( { commit } ){
            commit('appendEvent' , null);
            commit('setEventType' , null);
            commit('setEventDescription' , null);
            commit('setEventDate' , null);
            commit('closeDialog', null);
            commit( 'home/setSnackbar' , 'event was added successfully' , { root : true } );
            //commit('setAddNoteError', 'note is empty');
        },
        editEvent( { commit }){
            commit('editCurrentEventContent', null);
            commit('closeDialog', null);
            commit('setEventType' , null);
            commit('setEventDescription' , null);
            commit('setEventDate' , null);
            commit( 'home/setSnackbar' , 'event was edited successfully' , { root : true } );
        },
    }
}
  
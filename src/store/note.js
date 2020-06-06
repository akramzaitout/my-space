import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        noteText : null,
        noteDialog : false ,
        noteDialogMode: 'add',
        addNoteError : null,
        currentNote : null,
        notes : [],
    },
    getters : {
        notes(state) {
            return state.notes.sort( (a,b) => (a.isPin === b.isPin)? 0 : a.isPin? -1 : 1 );
        },
        notesLength(state) {
            return state.notes.length;
        }
    },
    mutations: {
        appendNote( state ) {
            let note = {
                content : state.noteText  || "" ,
                date : new Date(),
                isPin : false
            };
            state.notes.push( note );
        },
        removeNote( state , note ) {
            state.notes.splice( state.notes.indexOf(note) , 1);
        },
        setNoteText( state , noteText ) {
            state.noteText = noteText;
        },
        setAddNoteError( state , error ) {
            state.addNoteError = error;
        },
        setPinNote( state , note) {
            Vue.set( note , 'isPin' , !(note.isPin) );
        },
        editCurrentNoteContent( state ){
            Vue.set(  state.notes[ state.notes.indexOf(state.currentNote.note) ] , 'content' , state.noteText);
        },
        openEditDialog( state , note ) {
            state.noteText =  note.content ;
            state.currentNote = { note };
            state.noteDialogMode = 'edit';
            state.addNoteError = null;
            state.noteDialog = true;
        },
        openAddDialog( state ) {
            state.noteText = null;
            state.currentNote = {};
            state.noteDialogMode =  'add';
            state.addNoteError = null;
            state.noteDialog = true;
        },
        openReadDialog( state , note ) {
            state.noteText = note.content;
            state.noteDialogMode =  'read';
            state.noteDialog = true;
        },
        closeDialog( state ) {
            state.noteDialog = false;
        }
    },
    actions: {
        createNote( { commit } ){
            commit('appendNote' , null);
            commit('setNoteText' , null);
            commit('closeDialog', null);
            commit( 'home/setSnackbar' , 'note was added successfully' , { root : true } );
            //commit('setAddNoteError', 'note is empty');
        },
        deleteNote( { commit } , note ) {
            commit( 'removeNote' , note )
            commit( 'home/setSnackbar' , 'note was deleted successfully' , { root : true } );
        },
        editNote( { commit }){
            commit('editCurrentNoteContent', null);
            commit('closeDialog', null);
            commit('setNoteText' , null);
            commit( 'home/setSnackbar' , 'note was edited successfully' , { root : true } );
        },
        togglePinNote( { commit } , note ) {
            commit( 'home/setSnackbar' , 'note was ' + ( (note.isPin) ? 'unpined' : 'pined' )+ ' successfully' , { root : true } );
            commit( 'setPinNote' , note );
        }
    }
}
  

export default {
    namespaced: true,
    state: {
        pageName : null,
        dialog: false,
        snackbar : {
            status : false,
            text : null
        },
        navItems : [
            { name : null , title : 'Home' , icon : 'view-dashboard' },
            { name : "note" , title: 'Notes', icon: 'note' },
            { name : "task" , title: 'Tasks', icon: 'cow' },
            { name : "event" , title: 'Events', icon: 'calendar' },
        ]
    },
    getters : {
    },
    mutations: {
        setPageName(state,pageName) {
            state.pageName = pageName;
        },
        setSnackbar( state , text ) {
            state.snackbar.status = true;
            state.snackbar.text = text;
        },
        closeSnackbar( state ) {
            state.snackbar.status = false;
        }
    },
    actions: {
        openDialog( { commit , state } , mode) {
            if(mode) {
                commit( `${state.pageName}/open${mode}Dialog` , null , { root : true } );
            }
        },
        closeDialog( { commit , state } ) {
            commit( `${state.pageName}/closeDialog` , null , { root : true } )
        }
    }
}
  
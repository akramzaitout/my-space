export default {
    namespaced : true,
    state : {
        taskText : null,
        taskTitle : null,
        taskDialog : false ,
        addTaskError : null,
        tasks : []
    },
    getters:{
        tasks(state){
            return state.tasks;
        },
        unfinishedTasksLength(state) {
            return state.tasks.filter( (task) => !(task.isDone) ).length;
        }
    },
    mutations : {
        setTaskText(state , text) {
            state.taskText = text;
        },
        setTaskTitle( state , title ) {
            state.taskTitle = title
        },
        appendTask( state ) {
            state.tasks.push( { 
                title : state.taskTitle ,
                content : state.taskText ,
                isDone : false} );
        },
        toggleTask( state , task ){
            state.tasks[state.tasks.indexOf(task)].isDone = !task.isDone;
        },
        deleteTask( state , task ) {
            state.tasks.splice( state.tasks.indexOf(task) , 1 );
        },
        openAddDialog( state ) {
            state.taskText = null;
            state.taskTitle = null;
            state.addTaskError = null;
            state.taskDialog = true;
        },
        closeDialog( state ) {
            state.taskDialog = false;
        }
    },
    actions:{
        createTask( { commit } ){
            commit('appendTask' , null);
            commit('setTaskText' , null);
            commit('setTaskTitle' , null);
            commit('closeDialog', null);
            commit( 'home/setSnackbar' , 'task was added successfully' , { root : true } );
            //commit('setAddNoteError', 'note is empty');
        },
        deleteTask( { commit } , task ) {
            commit('deleteTask' , task);
            commit( 'home/setSnackbar' , 'task was deleted successfully' , { root : true } );
        }
    }
}
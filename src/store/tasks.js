//Action types

import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
    tasks: [],
    loading: false,
    error: null
}
// export const fetchTasks = createAsyncThunk('fetchTasks', async (a, { rejectWithValue }) => {
//     try {
//         const response = await axios.get("/tasks");
//         return { tasks: response.data };
//     } catch (error) {
//         return rejectWithValue({ error: error.message })
//     }
// })

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        apiRequested: (state, action) => {
            state.loading = true;
        },
        apiRequestFailed: (state, action) => {
            state.loading = false;
        },
        getTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks.splice(index, 1);
        },
        completeTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks[index].completed = action.payload.completed;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTasks.pending, (state, action) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchTasks.fulfilled, (state, action) => {
    //             state.tasks = action.payload.tasks;
    //             state.loading = false;
    //         })
    //         .addCase(fetchTasks.rejected, (state, action) => {
    //             state.error = action.payload.error;
    //             state.loading = false;
    //         });
    // }
})
export const { apiRequestFailed,apiRequested,getTasks, addTask, removeTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;

const url = "/tasks";

export const loadTasks = () => apiCallBegan({
    url,
    onStart: apiRequested.type,
    onSuccess: getTasks.type,
    onError: apiRequestFailed.type
});

export const addNewTask = (task) => apiCallBegan({
    url,
    method:'POST',
    data:task,
    onSuccess: addTask.type
})

export const updateTask = (task) => apiCallBegan({
    url: `${url}/${task.id}`,
    method:'PATCH',
    data:task,
    onSuccess: completeTask.type
})

export const deleteTask = (task) => apiCallBegan({
    url: `${url}/${task.id}`,
    method:'DELETE',
    onSuccess: removeTask.type
})


// extra reducers
// extraReducers: {
//     [fetchTasks.pending]: (state, action) => {
//       state.loading = true;
//     },
 
//     [fetchTasks.fulfilled]: (state, action) => {
//       state.tasks = action.payload.tasks;
//       state.loading = false;
//     },
 
//     [fetchTasks.rejected]: (state, action) => {
//       state.error = action.payload.error;
//       state.loading = false;
//     },
//   },


//import { createAction, createReducer } from "@reduxjs/toolkit";

//Actions
// export const addTask = createAction("ADD_TASK");
// export const removeTask = createAction("REMOVE_TASK");
// export const completeTask = createAction("TASK_COMPLETED");

// //Create reducer has been removed
// export default createReducer([], {
//     [addTask.type]: (state, action) => {
//         state.push({
//             id: ++id,
//             task: action.payload.task,
//             completed: false
//         });
//     },
//     [removeTask.type]: (state, action) => {
//         const index = state.findIndex(task => task.id === action.payload.id);
//         state.splice(index, 1);
//     },
//     [completeTask.type]: (state, action) => {
//         const index = state.findIndex(task => task.id === action.payload.id);
//         state[index].completed = true;
//     }
// })

// --------------------------------------------------------------------------------------------------------------------
// //Action types
// const ADD_TASK = "ADD_TASK";
// const REMOVE_TASK = "REMOVE_TASK";
// const TASK_COMPLETED = "TASK_COMPLETED";

// let id = 0;

// //Actions
// export const addTask = (task) => {
//     return { type: ADD_TASK, payload: { task } }
// }

// export const removeTask = (id) => {
//     return { type: REMOVE_TASK, payload: { id } }
// }

// export const completeTask = (id) => {
//     return { type: TASK_COMPLETED, payload: { id } }
// }

// export const fetchTodo = () => async (dispatch) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const tasks = await response.json();
//     dispatch(addTask(tasks.title))
// }


// //Reducers
// export default function reducer(state = [], action) {
//     switch (action.type) {
//         case ADD_TASK:
//             return [
//                 ...state,
//                 {
//                     id: ++id,
//                     task: action.payload.task,
//                     completed: false
//                 }
//             ]
//         case REMOVE_TASK:
//             return state.filter(task => task.id !== action.payload.id)
//         case TASK_COMPLETED:
//             return state.map(task => task.id === action.payload.id ? { ...task, completed: true } : task)
//         default:
//             return state;
//     }
// }
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employees";
import api from "./middleware/api";
import error from "./middleware/error";
import taskReducer from "./tasks";
const store = configureStore({
    reducer: {
        tasks: taskReducer,
        employees: employeeReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error]
});

export default store;




// ----------------------------------------------------------------------------
// const rootReducer = combineReducers({
//     task: taskReducer,
//     employee: employeeReducer
// })
// export default rootReducer;

// ----------------------------------------------------------------------------
// import { devToolsEnhancer } from "@redux-devtools/extension";
// import { legacy_createStore as createStore } from "redux";
// import reducer from "./tasks";

// const store = createStore(reducer, devToolsEnhancer({ trace: true }));

// export default store;
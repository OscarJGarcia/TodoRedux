import React from 'react';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <div>
      <AddTask />
      <Tasks />
    </div>
  )
}

export default App


// import React from 'react';
// import Tasks from './components/Tasks';
// import StoreContext from './contexts/storeContext';
// import store from "./store/configureStore";

// const App = () => {
//   return (
//     <StoreContext.Provider value={store}>
//       <div><Tasks /></div>
//     </StoreContext.Provider>
//   )
// }

// export default App
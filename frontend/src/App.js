// import React from 'react';
// import {  Routes as Switch, Route } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Login from './pages/Login'; 
// import Register from './pages/Register';
// import Home from './pages/Home';


// const App = () => {
//     return (
//       <>
           
//                <Navbar />
//                 <Switch>
//                     <Route path='/' component={Home}/>
//                     <Route path="/login" component={Login} />
//                     <Route path="/register" component={Register} />
               
//                 </Switch>
                
//                 </>
            
  
//     );
// }
// export default App;


// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import CreateContact from './pages/CreateContact';
import AllContacts from './pages/AllContacts'
import EditContact from './pages/EditContact';

const App = () => {
  return (
    <div className="App">

      <ToastContextProvider>
      <AuthContextProvider>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/mycontacts" element={<AllContacts/>} />
        <Route path="/edit/:id" element={<EditContact/>} />
      </Routes>

      </AuthContextProvider>
      </ToastContextProvider>
    </div>
  );
}

export default App;







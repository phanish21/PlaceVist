import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Users from "./Users";
import NewPlace from "./NewPlace";
import MainNavigation from "./MainNavigation";
import UserPlaces from "./UserPlaces";
import UpdatePlace from "./UpdatePlace";
import Authentication from "./Authentication";
import { AuthContext } from "./AuthContext";
import AuthenticationHook from "./AuthenticationHook";


function App() {
  
  const { token , userId , login , logout } = AuthenticationHook();

  let routes;

  if (token) {
    routes =  (
    <React.Fragment>
    <Route path="/" element={<Users />} />
    <Route path="/:id/places" element={<UserPlaces />} />
    <Route path="/places/new" element={<NewPlace />} />
    <Route path="/places/:id" element={<UpdatePlace />} />
    <Route path="*" element={<Navigate to="/" />} />
    </React.Fragment>
    )
  } else {
    routes = (
    <React.Fragment>
    <Route path="/" element={<Users />} />
    <Route path="/:id/places" element={<UserPlaces />} />
    <Route path="/auth" element={<Authentication /> } />
    <Route path="*" element={<Navigate to="/auth" />} />
    </React.Fragment>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn : !!token , token : token , userId : userId  , login : login , logout : logout}}>
    <Router>
      <MainNavigation />
      <main>
      <Routes>
        {routes}
      </Routes>
      </main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App

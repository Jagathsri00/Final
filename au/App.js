import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';


function App() {
  const {loginWithRedirect,logout,isAuthenticated}=useAuth0();
  return (
    <div className="App">
        <h1>Welcome to Auth0Login Page</h1>
        <div className="Auth0Buttons">
          {!isAuthenticated ?(
            <button onClick={()=>loginWithRedirect()}>Login</button>
          ): (
            <>
            <button onClick={()=>logout({returnTo : window.location.origin})}>Log Out</button>
            <p>You are successfully logged in</p>
            </>
          )};
      </div>
    </div>
  )
};


export default App;

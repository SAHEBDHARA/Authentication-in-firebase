import React, { useState } from "react";

const Authcontext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;


  

  // When the user logs in
const loginHandler = (token) => {
  const loginTime = new Date().getTime();
  localStorage.setItem('token', token);
  localStorage.setItem('loginTime', loginTime);
};

const isSessionExpired = () => {
  const loginTime = parseInt(localStorage.getItem('loginTime'));
  const currentTime = new Date().getTime();
  const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds

  return currentTime - loginTime > fiveMinutesInMillis;
};
const checkSession = () => {
  if (isSessionExpired()) {
    // Session has expired
    alert('Your session has expired. Please log in again.');
    logout();
  }
};

// Run the session check every 30 seconds (you can adjust the interval)
setInterval(checkSession, 30000); // 30 seconds in milliseconds


  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  };

  window.addEventListener('beforeunload', (event) => {
    if (isSessionExpired()) {
      event.preventDefault();
      event.returnValue = ''; // Show a confirmation dialog if needed
    }
  });
  

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <Authcontext.Provider value={contextValue}>
      {props.children}
    </Authcontext.Provider>
  );
};

export default Authcontext;

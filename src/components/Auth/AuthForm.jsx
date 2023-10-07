import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import Authcontext from "../../store/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const authCtx = useContext(Authcontext)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signupUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPICmsyhxv2pWB2005nPacWgE4cSbqBAQ";

      const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPICmsyhxv2pWB2005nPacWgE4cSbqBAQ'
setIsLoading(true)
    if (isLogin) {
     

    } else {
      fetch(signupUrl, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false)
          if (res.ok) {
            // Handle success
            return res.json()
          } else {
            return res.json().then((data) => {
              console.log("Error Response:", data.error.message);
              setIsError( data.error.message)
            });
          }
        }).then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
        fetch(loginUrl, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }).then((res) => {
            setIsLoading(false)
            if (res.ok) {
              return res.json(); 
            } else {
              return res.json().then((data) => {
                setIsError( data.error.message)
                alert(isError); 
                throw new Error(data.error.message); 
              });
            }
          }).then((data) => {
            // console.log(data)
          })
          .catch((error) => {
            console.error("Fetch Error:", error);
            alert(error.message)
          });
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" ref={emailInputRef} id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            ref={passwordInputRef}
            id="password"
            required
          />
        </div>
        {/* <button className={classes.button} type="submit">Submit</button> */}
       {!isLoading &&  <div className={classes.actions}>
        <button >Submit</button>
      </div>}
      {isLoading && <p>Request Sendin..</p>}
      {isError && <p>{isError}</p>}
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin && !isLoading ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;



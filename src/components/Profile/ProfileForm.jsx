import Authcontext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';

const ProfileForm = () => {
  const newPasswordInput = useRef();
  const authCtx = useContext(Authcontext)

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInput.current.value;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=YOUR_API_KEY`;
  
    // Create a data object with the new password
    const data = {
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: false,
    };
  
    // Make the POST request
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };
  
  return (
    <form className={classes.form} onClick={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

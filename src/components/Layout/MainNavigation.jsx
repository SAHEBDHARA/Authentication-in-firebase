import { Link } from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import Authcontext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(Authcontext)
  const logoutHandler = ()=>{
    authCtx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          { authCtx.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

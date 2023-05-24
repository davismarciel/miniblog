import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';

import { useAuthValue } from '../../context/AuthContext/AuthContext';

// CSS
import styles from './NavBar.module.css';

const NavBar = () => {
  const { user } = useAuthValue();

  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to="/">
        Mini
        {' '}
        <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => ((isActive) ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => ((isActive) ? styles.active : '')}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => ((isActive) ? styles.active : '')}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => ((isActive) ? styles.active : '')}
              >
                Create post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => ((isActive) ? styles.active : '')}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => ((isActive) ? styles.active : '')}
          >
            About
          </NavLink>
        </li>
        {user && (
        // Lembrar de criar um profile view com um pequeno menu dropdown para
        // clicar e abrir a opção de sair
          <li>
            <button onClick={logout}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

import { NavLink } from 'react-router-dom';

// CSS
import styles from './NavBar.module.css';

const NavBar = () => {
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
          <NavLink
            to="/login"
            className={({ isActive }) => ((isActive) ? styles.active : '')}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => ((isActive) ? styles.active : '')}
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => ((isActive) ? styles.active : '')}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { PiPawPrintDuotone } from 'react-icons/pi';
import styles from './Navbar.module.scss';

function Navbar () {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <span className={styles.navbar_logo_icon}>
          <PiPawPrintDuotone />
        </span>
        <span className={styles.navbar_logo_text}>Animal Search</span>
      </div>

      <ul className={styles.navbar_links}>
        <li>
          <NavLink
            to='/'
            exact
            className={styles.navbar_link}
            activeClassName={styles.navbar_link_active}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/pets/create'
            className={styles.navbar_link}
            activeClassName={styles.navbar_link_active}
          >
            Add Missing Pet
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/pets'
            exact
            className={styles.navbar_link}
            activeClassName={styles.navbar_link_active}
          >
            Pets List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles['site-title']}>
        Pokemon Topaz
      </Link>
      <ul>
        <CustomLink to="/pokedex">Pokedex</CustomLink>
        <CustomLink to="/pick">Random Battles</CustomLink>  
        {/* <CustomLink to="/quick">Random Battle</CustomLink> */}
        <CustomLink to="/memory">Memory Game</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname })
  return (
    <li className={isActive ? styles.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

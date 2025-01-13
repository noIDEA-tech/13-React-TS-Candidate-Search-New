import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav className="nav">
        <ul className="flex">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
            }
          >
              Nav
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/SavedCandidates"
              className={({ isActive }) =>
               isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Saved Candidates
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;

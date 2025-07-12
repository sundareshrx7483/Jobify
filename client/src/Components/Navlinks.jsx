import { NavLink } from "react-router-dom";
import links from "../utils/links.jsx";
import { useDashboardContext } from "../Pages/DashboardLayout";
const Navlinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            onClick={isBigSidebar ? null : toggleSidebar}
            key={text}
            className="nav-link"
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Navlinks;

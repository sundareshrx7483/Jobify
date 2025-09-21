import { NavLink } from "react-router-dom";
import links from "../utils/links.jsx";
import { useDashboardContext } from "../Pages/DashboardLayout.jsx";
const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (user?.role !== "admin" && path === "admin") return null;
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
export default NavLinks;

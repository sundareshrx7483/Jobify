import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../Pages/DashboardLayout";

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown className={`rotate-icon ${showLogout ? "rotated" : ""}`} />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logoutuser
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;

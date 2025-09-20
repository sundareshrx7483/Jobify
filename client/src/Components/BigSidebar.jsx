import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../Pages/DashboardLayout";
import Logo from "./Logo";
import Navlinks from "./NavLinks.jsx";
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

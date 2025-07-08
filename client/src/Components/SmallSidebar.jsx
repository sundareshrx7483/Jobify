import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../Pages/DashboardLayout";
const SmallSidebar = () => {
  const data = useDashboardContext();
  console.log(data);

  return <Wrapper>SmallSidebar</Wrapper>;
};
export default SmallSidebar;

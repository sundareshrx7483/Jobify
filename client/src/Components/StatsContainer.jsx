import StatItem from "./StatItem.jsx";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats.pending || 0,
      icon: <FaSuitcaseRolling />, // suitcase icon
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats.interview || 0,
      icon: <FaCalendarCheck />, // calendar icon
      color: "#10b981",
      bcg: "#d1fae5",
    },
    {
      title: "jobs declined",
      count: defaultStats.declined || 0,
      icon: <FaBug />, // bug icon
      color: "#ef4444",
      bcg: "#fee2e2",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
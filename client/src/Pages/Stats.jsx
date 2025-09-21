import { useLoaderData } from "react-router-dom";
import api from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../Components";

// Fetch stats from backend; always return a predictable shape
export const loader = async () => {
  try {
    const { data } = await api.get("/jobs/stats");
    return data;
  } catch (error) {
    return {
      defaultStats: { pending: 0, interview: 0, declined: 0 },
      monthlyApplications: [],
    };
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;

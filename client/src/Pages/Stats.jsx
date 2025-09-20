import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../Components";

export const loader = async () => {
  const { data } = await customFetch.get("/jobs/stats");
  return data;
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

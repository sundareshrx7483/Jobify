import { JobsContainer, SearchContainer } from "../Components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import customFetch from "../utils/customFetch";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await api.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;

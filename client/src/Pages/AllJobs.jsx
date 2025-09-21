import { JobsContainer, SearchContainer } from "../Components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import api from "../utils/customFetch";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await api.get("/jobs", { params });
    return {
      data,
      searchValues: {
        search: "",
        jobStatus: "all",
        jobType: "all",
        sort: "newest",
        ...params,
      },
    };
  } catch (error) {
    // Ensure we always return the expected shape to avoid runtime errors
    return {
      data: { jobs: [], totalJobs: 0, numOfPages: 1, page: 1 },
      searchValues: {
        search: "",
        jobStatus: "all",
        jobType: "all",
        sort: "newest",
      },
    };
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

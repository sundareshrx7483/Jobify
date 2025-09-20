import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  const { id } = params;
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job deleted");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Delete failed");
  }
  return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => null;
export default DeleteJob;

import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../Components/FormRow";
import FormRowSelect from "../Components/FormRowSelect";
import { Form, useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import { SubmitBtn } from "../Components";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/jobs/${id}`);
    return data.job;
  } catch (error) {
    toast.error("Failed to load job");
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${id}`, data);
    toast.success("Job updated");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Update failed");
    return null;
  }
};

const EditJob = () => {
  const job = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <SubmitBtn text="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

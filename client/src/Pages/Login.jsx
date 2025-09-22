import { Link, redirect, Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../Components";
import api from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await api.post("/auth/login", data);
    toast.success("Logged in successfully", { autoClose: 2000 });
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg, { autoClose: 3000 });
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="sundaresh@gmail.com" />
        <FormRow type="password" name="password" defaultValue="Sundar@123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block"
          onClick={async () => {
            const email = "test@gmail.com";
            const password = "Test@123";
            try {
              await api.post("/auth/login", { email, password });
              toast.success("Test drive");
              window.location.assign("/dashboard");
            } catch (error) {
              toast.error("Demo login failed");
            }
          }}
        >
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;

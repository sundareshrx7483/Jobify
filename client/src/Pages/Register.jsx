import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../Components";

export const action = async (data) => {
  console.log(data);
  return null;
};
const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelText="Name"
          defaultValue="Sundaresh"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Sekar"
        />
        <FormRow
          type="text"
          name="location"
          labelText="location"
          defaultValue="Salem"
        />
        <FormRow type="email" name="email" defaultValue="sundaresh@gmail.com" />
        <FormRow type="password" name="password" defaultValue="Sundar@123" />
        <button className="btn btn-block">Submit</button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

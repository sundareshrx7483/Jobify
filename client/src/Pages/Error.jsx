import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import errorImg from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={errorImg} alt="Page not found illustration" />
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to="/dashboard">go back to home</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>something went wrong</h3>
      <Link to="/dashboard">go back to home</Link>
    </Wrapper>
  );
};
export default Error;

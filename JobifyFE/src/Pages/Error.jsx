import { Link, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      <h1>Error Page</h1>
      
        {error && (
        <div>
          <h6>Status: {error.status}</h6>
          <h6>Status Text: {error.statusText}</h6>
          <h6>Data: {error.data}</h6>
        </div>
      )}
      
      
      <Link to="/">Back To Home</Link>
    </div>
  )
}
export default Error
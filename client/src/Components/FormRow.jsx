const FormRow = ({ type, name, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required
        className="form-input"
      />
    </div>
  );
};
export default FormRow;

const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        className="form-input"
      />
    </div>
  );
};
export default FormRow;

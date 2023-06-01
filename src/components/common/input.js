import React from "react";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  focus = false,
}) => {
  return (
    <div className="my-3">
      <label className="form-label text-capitalize" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-control"
        autoFocus={focus}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="alert alert-secondary my-2 text-danger">{error}</div>
      )}
    </div>
  );
};

// Input.propTypes = {
//   type: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.bool,
//   ]),
//   onChange: PropTypes.func.isRequired,
//   error: PropTypes.string,
//   disabled: PropTypes.bool,
//   focus: PropTypes.bool,
// };

// Input.defaultProps = {
//   type: "text",
//   disabled: false,
//   focus: false,
// };

export default Input;

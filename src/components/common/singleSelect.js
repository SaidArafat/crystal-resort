import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const SingleSelect = ({ label, options, value, onChange, error }) => {
  return (
    <div className="form-group my-3">
      <label className="text-capitalize">{label}</label>
      <Select
        options={options}
        onChange={onChange}
        isSearchable
        components={animatedComponents}
        required
      />
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </div>
  );
};

SingleSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  //   options: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       value: PropTypes.number.isRequired,
  //       label: PropTypes.string.isRequired,
  //     })
  //   ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object),
};

export default SingleSelect;

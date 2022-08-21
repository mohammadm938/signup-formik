const Radio = ({ formik, name, labelName, value }) => {
  return (
    <div className="flex space-x-2">
      <label htmlFor={value}>{labelName}</label>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        onChange={formik.handleChange}
        checked={formik.values.gender === value}
      />
    </div>
  );
};

export default Radio;

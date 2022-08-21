const CheckBoxOptions = ({ formik, name, labelName, value }) => {
  return (
    <div className="flex space-x-2">
      <label htmlFor={value}>{labelName}</label>
      <input
        type="checkbox"
        name={name}
        id={value}
        value={value}
        onChange={formik.handleChange}
        checked={formik.values[name].includes(value)}
      />
    </div>
  );
};

export default CheckBoxOptions;

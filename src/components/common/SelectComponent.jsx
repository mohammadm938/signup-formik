const SelectComponent = ({ formik, name, labelName, nationalitys }) => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4">
        <label className="font-bold" htmlFor={name}>
          {labelName}:
        </label>
        <select
          className="p-1 rounded-md bg-white"
          {...formik.getFieldProps(name)}
          name={name}
          id={name}
          value={formik.values[name]}
        >
          <option value="">Nothing</option>
          {nationalitys.map((national) => (
            <option key={national.id} value={national.value}>
              {national.name}
            </option>
          ))}
        </select>
      </div>
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-sm flex justify-center items-center mt-2 text-red-600 font-bold">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;

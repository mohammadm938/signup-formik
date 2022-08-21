import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import CheckBoxOptions from "./common/CheckBoxOptions";
import Input from "./common/Input";
import Radio from "./common/Radio";
import SelectComponent from "./common/SelectComponent";

let initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
  gender: "",
  nationality: "",
  skills: [],
  terms: false,
};

const inputOptions = [
  { id: 1, name: "name", labelName: "Name" },
  { id: 2, name: "email", labelName: "Email" },
  { id: 3, name: "phoneNumber", labelName: "Phone Number" },
  { id: 4, name: "password", labelName: "Password", type: "password" },
  {
    id: 5,
    name: "passwordConfirmation",
    labelName: "Password Confirmation",
    type: "password",
  },
];

const radioOptions = [
  { id: 1, name: "gender", labelName: "Male", value: "0" },
  { id: 2, name: "gender", labelName: "Female", value: "1" },
];

const nationalities = [
  { id: 1, name: "Egyptian", value: "EG" },
  { id: 2, name: "American", value: "US" },
  { id: 3, name: "French", value: "FR" },
  { id: 4, name: "German", value: "DE" },
  { id: 5, name: "Italian", value: "IT" },
  { id: 6, name: "Spanish", value: "ES" },
  { id: 7, name: "Russian", value: "RU" },
  { id: 8, name: "Turkish", value: "TR" },
  { id: 9, name: "Arabic", value: "AR" },
  { id: 10, name: "Chinese", value: "CN" },
  { id: 11, name: "Japanese", value: "JP" },
  { id: 12, name: "Korean", value: "KR" },
  { id: 13, name: "Polish", value: "PL" },
  { id: 14, name: "Portuguese", value: "PT" },
  { id: 15, name: "Swedish", value: "SE" },
  { id: 16, name: "Thai", value: "TH" },
  { id: 17, name: "Vietnamese", value: "VN" },
  { id: 18, name: "Iran", value: "IR" },
  { id: 20, name: "United kingdom", value: "GB" },
  { id: 21, name: "United states", value: "US" },
];

const skills = [
  { id: 1, labelName: "React", value: "react" },
  { id: 2, labelName: "Angular", value: "angular" },
  { id: 3, labelName: "Vue", value: "vue" },
];

const SignupForm = () => {
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3001/users", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    formik.setSubmitting(false);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches("^[0-9]{11}$", "Phone number is invalid"),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    gender: yup.string().required("Gender is required"),
    nationality: yup.string().required("Nationality is required"),
    skills: yup.array().min(1).required("at least one skill required"),
    terms: yup
      .bool()
      .required("You need to accept the terms and conditions")
      .oneOf([true], "The termes and conditions must be accepted"),
  });

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="flex justify-center items-center bg-gray-200 mt-2 p-4  w-1/3 rounded-lg shadow-xl  ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center space-y-5"
      >
        {/* create inputs */}
        {inputOptions.map((input) => (
          <Input key={input.id} formik={formik} {...input} />
        ))}

        {/* create select option */}
        <SelectComponent
          formik={formik}
          name="nationality"
          labelName="Nationality"
          nationalitys={nationalities}
        />

        {/* create radio options */}
        <div className="flex space-x-2">
          {radioOptions.map((radio) => (
            <Radio key={radio.id} formik={formik} {...radio} />
          ))}
          {formik.errors.gender && formik.touched.gender && (
            <div className="text-sm flex justify-center items-center mt-2 text-red-600 font-bold">
              {formik.errors.gender}
            </div>
          )}
        </div>

        {/* create checkbox option */}
        <div className="flex space-x-2">
          {skills.map((skill) => (
            <CheckBoxOptions
              key={skill.id}
              formik={formik}
              name="skills"
              {...skill}
            />
          ))}
        </div>
        {formik.errors.skills && (
          <div className="text-sm flex justify-center items-center mt-2 text-red-600 font-bold">
            {formik.errors.skills}
          </div>
        )}

        {/* Terms and conditions */}
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <label htmlFor="terms">Terms and Conditions</label>
            <input
              type="checkbox"
              name="terms"
              id="terms"
              value={true}
              onChange={formik.handleChange}
              checked={formik.values.terms}
            />
          </div>
        </div>
        {formik.errors.terms && (
          <div className="text-sm flex justify-center items-center mt-2 text-red-600 font-bold">
            {formik.errors.terms}
          </div>
        )}

        {/* create submit button */}
        <button
          type="submit"
          disabled={!formik.isValid}
          className="disabled:bg-gray-600 disabled:text-white disabled:border-gray-600 flex justify-center items-center border border-green-500 p-1 w-1/3 rounded-md transition-all hover:transition-all hover:bg-green-500 hover:text-white "
        >
          {formik.isSubmitting
            ? "Submitting..."
            : formik.isValid
            ? "Submit"
            : "Fill out all fields"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

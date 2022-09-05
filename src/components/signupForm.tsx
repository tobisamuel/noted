import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import signUp from "../api/signup";
import { getErrorStatus } from "../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (data, { resetForm }) => {
      try {
        const response = await signUp(data);
        setSuccess(true);
        resetForm();
      } catch (error) {
        const status = getErrorStatus(error);
        if (status === 400) {
          setError("Missing credentials. Please input all your details.");
        } else if (status === 409) {
          setError(
            "A user with this email address already exists. Please try again."
          );
        } else {
          setError("Internal server error. Please try again later.");
        }
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter a valid email address"),
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("This field is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("This field is required"),
      password: Yup.string()
        .matches(
          PWD_REGEX,
          "Passwords must be between 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character (!, #  or @)."
        )
        .required("Please enter a password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match.")
        .required("Please enter a password"),
    }),
  });

  const renderErrorMessage = (field: string) => {
    return formik.touched[field as keyof typeof formik.touched] &&
      formik.errors[field as keyof typeof formik.errors] ? (
      <span className="text-sm text-red-500">
        {formik.errors[field as keyof typeof formik.errors]}
      </span>
    ) : null;
  };

  return (
    <>
      {success ? (
        <div className="mt-3 py-2 rounded">
          <p>
            <span className="font-semibold text-green-500">Success! </span>
            <b className="font-semibold text-zinc-700">
              <Link to="/login">Login</Link>
            </b>{" "}
            to your account
          </p>
        </div>
      ) : null}

      {error && <p className="mt-2 font-semibold text-red-500 ">{error}</p>}

      <form className="flex flex-col mt-4" onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <fieldset>
            <label
              htmlFor="email"
              className="inline-block text-sm font-semibold"
            >
              Email Address
            </label>

            <input
              id="email"
              className={`w-full border-2 p-2 mt-1 rounded-md text-base font-normal ${
                formik.errors.email ? "outline-red-500" : "outline-green-500"
              } focus:outline-2 focus:outline-offset-0`}
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("email")}
              required
            />

            {renderErrorMessage("email")}
          </fieldset>

          <fieldset>
            <label
              htmlFor="firstName"
              className="inline-block text-sm font-semibold"
            >
              First Name
            </label>

            <input
              id="firstName"
              className={`w-full border-2 p-2 mt-1 rounded-md text-base font-normal ${
                formik.errors.firstName
                  ? "outline-red-500"
                  : "outline-green-500"
              } focus:outline-2 focus:outline-offset-0`}
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("firstName")}
              required
            />
            {renderErrorMessage("firstName")}
          </fieldset>

          <fieldset>
            <label
              htmlFor="lastName"
              className="inline-block text-sm font-semibold"
            >
              Last Name
            </label>

            <input
              id="lastName"
              className={`w-full border-2 p-2 mt-1 rounded-md text-base font-normal ${
                formik.errors.lastName ? "outline-red-500" : "outline-green-500"
              } focus:outline-2 focus:outline-offset-0`}
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("lastName")}
              required
            />
            {renderErrorMessage("lastName")}
          </fieldset>

          <fieldset>
            <label
              htmlFor="password"
              className="inline-block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              className={`w-full border-2 p-2 mt-1 rounded-md ${
                formik.errors.password ? "outline-red-500" : "outline-green-500"
              } focus:outline-2 focus:outline-offset-0`}
              type="password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
            />
            {renderErrorMessage("password")}
          </fieldset>

          <fieldset>
            <label
              htmlFor="confirmPassword"
              className="inline-block text-sm font-semibold"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              className={`w-full border-2 p-2 mt-1 rounded-md ${
                formik.errors.confirmPassword
                  ? "outline-red-500"
                  : "outline-green-500"
              } focus:outline-2 focus:outline-offset-0`}
              type="password"
              autoComplete="off"
              {...formik.getFieldProps("confirmPassword")}
            />
            {renderErrorMessage("confirmPassword")}
          </fieldset>
        </div>

        <button
          className="mt-6 p-3 bg-zinc-600 text-white text-md font-medium rounded-md hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all duration-300"
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;

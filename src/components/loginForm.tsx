import { useLayoutEffect, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../api/requests";
import * as Yup from "yup";

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginForm = () => {
  const { setAuth } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = (location.state as LocationState)?.from.pathname;

  useLayoutEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data, { resetForm }) => {
      try {
        const auth = await login(data);
        setAuth(auth);
        resetForm();
        navigate(pathname || "/notes", { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("This field is required"),
      password: Yup.string().required("Enter your password"),
    }),
  });

  return (
    <form className="flex flex-col mt-8" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email" className="inline-block text-sm font-semibold">
          Email Address
        </label>
        <input
          id="email"
          className={`w-full border-2 px-2 py-3 mt-1 rounded-md text-base font-normal ${
            formik.errors.email ? "outline-red-500" : "outline-green-500"
          } focus:outline-2 focus:outline-offset-0`}
          type="text"
          autoComplete="off"
          ref={userRef}
          {...formik.getFieldProps("email")}
          required
        />

        {formik.touched.email && formik.errors.email ? (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        ) : null}

        <label
          htmlFor="password"
          className="inline-block mt-3 text-sm font-semibold"
        >
          Password
        </label>
        <input
          id="password"
          className={`w-full border-2 px-2 py-3 mt-1 rounded-md ${
            formik.errors.password ? "outline-red-500" : "outline-green-500"
          } focus:outline-2 focus:outline-offset-0`}
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
        />

        {formik.touched.password && formik.errors.password ? (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        ) : null}
      </div>

      <button
        className="mt-4 p-3 bg-zinc-600 text-white text-md font-medium rounded-md"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

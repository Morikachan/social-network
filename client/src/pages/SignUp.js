import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { userSignup } from "../redux/actions/userActions";

function SingUp() {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .typeError("Login must be a string")
      .required("Login is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .typeError("Password must be a string")
      .required("Password is required"),

    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Password do not match")
      .required("Password is required"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          login: "",
          email: "",
          password: "",
          confirmPass: "",
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(userSignup(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              placeholder="Login"
            />
            {touched.login && errors.login && <p>{errors.login}</p>}

            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email"
            />
            {touched.email && errors.email && <p>{errors.email}</p>}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
            />
            {touched.password && errors.password && <p>{errors.password}</p>}

            <input
              type="password"
              name="confirmPass"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPass}
              placeholder="Confirm password"
            />
            {touched.confirmPass && errors.confirmPass && (
              <p>{errors.confirmPass}</p>
            )}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SingUp;

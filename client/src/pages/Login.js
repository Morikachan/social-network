import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    loginOrEmail: yup
      .string()
      .typeError("This field must be a string")
      .required("This field is required"),
    password: yup
      .string()
      .typeError("Password must be a string")
      .required("Password is required"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          loginOrEmail: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(userLogin(values));
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
              name="loginOrEmail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.loginOrEmail}
              placeholder="Login or Email"
            />
            {touched.loginOrEmail && errors.loginOrEmail && (
              <p>{errors.loginOrEmail}</p>
            )}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
            />
            {touched.password && errors.password && <p>{errors.password}</p>}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;

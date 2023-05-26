import React, { useState, useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/bootstrap.css";
import InputField from "../UI/InputField";
import "./styles.scss";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Dashboard/Navbar";
import Footer from "../Components/Dashboard/Footer";
import Select from "react-select";

const SignupPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const signupUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    role: Yup.string().required("This field is required"),
  });

  const handleBlur = (e) => {
    e.target.onBlur();
  };

  const { signup, loading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      zipCode: "",
      role: "",
    },
    enableReinitialize: true,
    validationSchema: signupUserSchema,
    validateOnBlur: handleBlur,
    onSubmit: async (values) => {
      try {
        let success = await signup(
          values.firstName,
          values.lastName,
          values.email,
          phone,
          values.password,
          selectedRole ? selectedRole.value : ""
        );
        if (success) navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const roleOptions = [
    { value: "User", label: "User" },
    { value: "Admin", label: "Admin" },
  ];

  return (
    <div>
      <Navbar />
      <div className="login-signup-container ">
        <div className="login-singup-form-container signup-form">
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <InputField
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  helpertext={formik.errors.firstName}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-control">
                <InputField
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  helpertext={formik.errors.lastName}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-control">
                <InputField
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onHandleChange={formik.handleChange}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helpertext={formik.errors.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="phone-input-container">
                <PhoneInput
                  country={"lk"}
                  enableSearch={true}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  containerClass=""
                  style={{
                    marginLeft: "12px",
                    direction: "ltr",
                  }}
                />
                {!phone && (
                  <small
                    className="error"
                    style={{
                      marginLeft: "12px",
                    }}
                  >
                    This field is required
                  </small>
                )}
              </div>
              <div className="form-control">
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  helpertext={formik.errors.password}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-control">
                <Select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={(selectedOption) => {
                    setSelectedRole(selectedOption);
                    formik.setFieldValue("role", selectedOption.value);
                  }}
                  options={roleOptions}
                  placeholder="Select Role"
                  isClearable
                  className={
                    Boolean(formik.touched.role && formik.errors.role)
                      ? "select-error"
                      : ""
                  }
                />
                {Boolean(formik.touched.role && formik.errors.role) && (
                  <div className="error">{formik.errors.role}</div>
                )}
              </div>

              <div className="signup-disclaimer">
                <span>
                  By signing up, you agree to our <Link to="/terms">Terms</Link>{" "}
                  and <Link to={"/privacy"}>Privacy Policy</Link>.
                </span>
              </div>
              <button
                type="submit"
                className="login-signup-signupBtn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;

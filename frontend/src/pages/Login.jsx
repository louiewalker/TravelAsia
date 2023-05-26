import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../UI/InputField';
import { AuthContext } from '../context/AuthContext'
import jwt_decode from 'jwt-decode'
import Navbar from '../Components/Dashboard/Navbar';
import { useIsMobile } from '../context/MobileContext';
import Footer from '../Components/Dashboard/Footer';
import './styles.scss';

const LoginPage = () => {
  const isMobile= useIsMobile()
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext)
  const [error, setError]= useState("")
  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email address')
      .required('Please enter email address'),
    password: Yup.string().required('Must enter a valid password'),
  });
  const handleBlur = (e) => {
    e.target.onBlur();
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: loginUserSchema,
    validateOnBlur: handleBlur,
    onSubmit: async (values) => {
      const data = await login(values.email, values.password)
      if(data.error){
        return setError(data.error)
      }
      const decoded = jwt_decode(data.token)
      localStorage.setItem("token", data.token)
      navigate("/")

    },
  });

  return (
    <div>
      <Navbar />
      <div className="login-signup-container">
        <div className="login-singup-form-container">

          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <div className="form-control">
              <label htmlFor="email">Email</label>
                <InputField
                  type="text"
                  placeholder="Email address"
                  name="email"
                  value={formik.values.email}
                  onHandleChange={formik.handleChange}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helpertext={formik.errors.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-control">
              <label htmlFor="email">Password</label>
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onHandleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  helpertext={formik.errors.password}
                />
              </div>
              <div className="forgot-password">
              <Link to={'/'}>Forgot Password?</Link>
              </div>
              {error && (
                <p style={{color: "red", marginLeft: "12px"}}>{error}</p>
              )}
              <button 
                type="submit" 
                className="login-signup-signupBtn"
                disabled={loading}
              >
                {loading? "Loggin In..." : "Log In"}
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LoginPage;

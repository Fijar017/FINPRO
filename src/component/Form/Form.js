import React, {useState} from "react";
import "../Form/Form.css";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL, API_KEY } from "../../Environment";
import imgmasterfood1 from '../../img/masterfood1.png'
import imgmasterfood2 from '../../img/masterfood2.png'
import UploadImage from "../UploadImage/UploadImage";



const Form = () => {
  const [classNameSignUp, setclassNameSignUp] = useState("");
  const [UploadFile, setUploadFile] = useState('');

  const handleSignUp = () => {
    setclassNameSignUp("sign-up-mode");
  };

  const handleSignIn = () => {
    setclassNameSignUp("");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "user",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/register`,
        headers: {
          apiKey: `${API_KEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
          profilePictureUrl: UploadFile,
        },
      })
        .then((Response) => {
          alert("Registration Successful !!");
          window.location.reload()
        })
        .catch((e) => {
          alert("Registration Failed !!");
        });
    },
  });

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required") 
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/login`,
        headers: {
          apiKey: `${API_KEY}`,
          
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((Response) => {
          alert("Login Succesfull");
          const token = Response.data.token;
          localStorage.setItem("token", token);

          const role = Response.data.user.role;
          localStorage.setItem("role", role);

          const name = Response.data.user.name;
          localStorage.setItem("name", name);

          const email = values.email;
          localStorage.setItem("email", email);
          window.location.href = "/home";
        })
        .catch((error) => {
          console.log(error);
          alert("Login Failed! Please, Check Email and Password !!");
        });
    },
  });

  return (
    <>
      <div className={`container-form ${classNameSignUp}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* sign-in  */}
            <form onSubmit={formLogin.handleSubmit} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="input-box"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.email}
                  placeholder="Email"
                />
                {formLogin.touched.email && formLogin.errors.email ? (
                  <div>{formLogin.errors.email}</div>
                ) : null}
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.password}
                  placeholder="Password"
                />
              </div> 
              <div className="z">
              <input type="submit" value="Login" className="button-login solid" />
              <button
                className="button-login transparent"
                id="sign-up-btn"
                onClick={() => handleSignUp()}
              >
                Sign up
              </button>
              </div>
              <p className="social-text">Dont have account? Sign Up please or try to Sign in with social platforms</p>
              <div className="social-media">
                <div className="social-icon">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="social-icon">
                  <i className="fab fa-google"></i>
                </div>
              </div>
            </form>
            {/* end-sign-in  */}

            {/* sign-up  */}
            <form onSubmit={formik.handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />

                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordRepeat}
                />

                {formik.touched.passwordRepeat &&
                formik.errors.passwordRepeat ? (
                  <div>{formik.errors.passwordRepeat}</div>
                ) : null}
              </div>
              <div className="input-field">
                <i className="fa fa-phone"></i>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div style={{position: 'relative', left: '30px'}}>
                <UploadImage
                onChange={(value) => setUploadFile(value)} />
              </div>
              <button type="submit" className="button-login btn-primary">
                Submit
              </button>
            </form>
            {/* end-sign-up  */}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
            <img src={imgmasterfood1} className="image" alt="chefman" />
            </div>
          </div>

          <div className="panel right-panel">
            <div className="content">
            <img src={imgmasterfood2} className="image" alt="chefgirl" />
              <button
                className="button-login transparent"
                id="sign-in-btn"
                onClick={() => handleSignIn()}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

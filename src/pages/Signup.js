import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import axios from "axios";
import {useEffect, useState} from "react";
import {redirect, useNavigate} from "react-router-dom";

function Signup() {
    const baseURL = "http://localhost:8080/users/";
    const [error, setError] = useState("")
    const navigate = useNavigate();
    let passwordValue = "";

    function handleSignup(event) {
        event.preventDefault()

        async function SignupReq() {
            let temp = await axios.post(baseURL,
                {
                    username: event.target.username.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                    confirmPassword: event.target.passConfirm.value,
                    address: event.target.address.value,
                    birthDate: event.target.date.value
                }
            );
            if (temp.data.success === true)
                navigate("/login");
            else
                setError(temp.data.message);
        }

        SignupReq();

    }

    return (
        <>
            <Navbar/>
            <main>
                <section>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card login-card">
                                    <div className="card-body px-5 text-center">

                                        <form className="pb-2" onSubmit={event => handleSignup(event)}>

                                            <img className="pb-3 logo" src={require("../assets/images/Logo.png")}
                                                 alt="logo"/>
                                            <p className="item-title-text pb-2">Sign up</p>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info username me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="username" placeholder="Username" type="text"
                                                           id="username"
                                                           className="login-input form-control form-control-lg"
                                                           required/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info email me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="email" placeholder="Email" type="email" id="email"
                                                           className="login-input form-control form-control-lg"
                                                           required/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="bi-key-fill me-1 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="password" placeholder="Password" type="password"
                                                           id="passwrod"
                                                           className="login-input form-control form-control-lg"
                                                           required
                                                           onChange={event => passwordValue = event.target.value}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="bi-lock-fill me-1 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="passConfirm" placeholder="Confirm Password"
                                                           type="password"
                                                           id="confirm-password"
                                                           className="login-input form-control form-control-lg" required
                                                           onChange={event => {
                                                               if (passwordValue === event.target.value) {
                                                                   event.target.setCustomValidity('')
                                                               } else {
                                                                   event.target.setCustomValidity('Password does not match')
                                                               }
                                                           }}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info date me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="date" type="date" id="birthdate"
                                                           className="form-control form-control-lg login-input"
                                                           required/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-4">
                                                <i className="profile-info location me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="address" placeholder="Address" type="text" id="address"
                                                           className="form-control form-control-lg login-input"
                                                           required/>
                                                </div>
                                            </div>

                                            <button className="btn brown-btn btn-lg px-5 ms-4 signup-btn"
                                                    type="submit">Register
                                            </button>

                                        </form>
                                        <div className="text-danger">{error}</div>
                                        <div>
                                            <p className="mb-0 recovery-text">You already have an account? <a
                                                href="./login" className=" fw-bold">Login</a>
                                            </p>
                                        </div>
                                        <a className="btn btn-block btn-social btn-lg btn-github"
                                           onClick={() => window.location.replace("https://github.com/login/oauth/authorize?client_id=Iv1.807e4d8450f5fa8f&scope=user")}>
                                            <svg className="fa fa-github" xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            Sign up with GitHub</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Signup
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup() {
    const baseURL = "http://localhost:8080/users/";
    const [error, setError] = useState("")
    const navigate = useNavigate();
    function handleSignup(event){
        event.preventDefault()
        async function SignupReq(){
            let temp = await axios.post(baseURL,
                {
                    username: event.target.username.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                    confirmPassword: event.target.passConfirm.value,
                    address: event.target.address.value,
                    date: event.target.date.value
                }
            );
            if(temp.data.success === true)
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

                                            <img className="pb-3 logo" src={require("../Images/Logo.png")} alt="logo"/>
                                            <p className="item-title-text pb-2">Sign up</p>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info username me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="username" placeholder="Username" type="text" id="username"
                                                           className="login-input form-control form-control-lg"/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info email me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="email" placeholder="Email" type="email" id="email"
                                                           className="login-input form-control form-control-lg"/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="bi-key-fill me-1 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="password" placeholder="Password" type="password" id="passwrod"
                                                           className="login-input form-control form-control-lg"/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="bi-lock-fill me-1 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="passConfirm" placeholder="Confirm Password" type="password"
                                                           id="confirm-password"
                                                           className="login-input form-control form-control-lg"/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-2">
                                                <i className="profile-info date me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="date" type="date" id="birthdate"
                                                           className="form-control form-control-lg login-input"/>
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex flex-row align-items-center justify-content-between mb-4">
                                                <i className="profile-info location me-0 login-icon"></i>
                                                <div className="form-outline flex-fill  mb-0">
                                                    <input name="address" placeholder="Address" type="text" id="address"
                                                           className="form-control form-control-lg login-input"/>
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
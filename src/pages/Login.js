import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {DataContext} from "../context/DataContext";

function Login() {
    const baseURLLogin = "http://localhost:8080/auth/login";
    const baseURLAuth = "http://localhost:8080/auth/";
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {user, setUser} = useContext(DataContext)
    function handleLogin(event){
        event.preventDefault()
        async function LoginReq(){
            let temp = await axios.post(baseURLLogin,
                {
                    username: event.target.username.value,
                    password: event.target.password.value
                }
            );
            if(temp.data.success === true){
                localStorage.setItem("token", temp.data.data)
                let temp2 = await axios.get(baseURLAuth, {headers: {Authorization : localStorage.getItem("token")}});
                if (temp2.data.success === true) {
                    setUser(temp2.data.data.data);
                    navigate("/");
                } else setError(temp2.data.message);
            } else setError(temp.data.message);
        }
        LoginReq();

    }
    return (
        <>
            <Navbar search = {false} buttons = {false}/>
            <main>
                <section>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card login-card">
                                    <div className="card-body px-5 text-center">

                                        <form className="pb-2" onSubmit={event => handleLogin(event)}>

                                            <img className="pb-3 logo" src={require("../assets/images/Logo.png")} alt="logo"/>
                                            <p className="item-title-text pb-2">Sign into your account</p>

                                            <div className="form-outline mb-2">
                                                <input name="username" placeholder="Username" type="text" id="typeEmailX"
                                                       className="login-input form-control form-control-lg"/>
                                            </div>

                                            <div className="mb-3">
                                                <input name="password" placeholder="Password" type="password" id="typePasswordX"
                                                       className="login-input form-control form-control-lg"/>
                                            </div>

                                            <button className="btn brown-btn btn-lg px-5 w-100" type="submit">Login
                                            </button>

                                        </form>
                                        <div className="text-danger">{error}</div>

                                        <div className="align-items-center">
                                            <p className="mb-0 recovery-text">Don't have an account? <a
                                                href="/Signup"
                                                className=" fw-bold">Sign
                                                Up</a>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default Login;
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {DataContext} from "../context/DataContext";

function OAuth(){
    const baseURL = "http://localhost:8080/users/oAuth";
    const baseURLAuth = "http://localhost:8080/auth/";
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const code = urlParams.get("code")
    const {user, setUser} = useContext(DataContext)
    async function OAuthRequest() {
        let temp = await axios.post(baseURL,
            {
                code: code,
            }
        );
        if(temp.data.success === true){
            localStorage.setItem("token", temp.data.data)
            let temp2 = await axios.get(baseURLAuth, {headers: {Authorization : localStorage.getItem("token")}});
            if (temp2.data.success === true) {
                setUser(temp2.data.data.data);

            }
        }
        navigate("/");
    }

    OAuthRequest();
}

export default OAuth
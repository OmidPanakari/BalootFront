import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "./App";

function Protected(props){
    const baseURLAuth = "http://localhost:8080/auth/";
    const {user, updateUser} = useContext(DataContext);
    async function AuthReq(){
        let temp = await axios.get(baseURLAuth);
        if(temp.data.success === true){
            updateUser(temp.data.data.data)
        }
    }
    AuthReq();
    // const navigate = useNavigate();
    // if (localStorage.getItem("token") === null)
    //     navigate("/login");
    return(
        <>
            {props.children}
        </>
    )
}

export default Protected;
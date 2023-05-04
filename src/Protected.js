import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DataContext} from "./App";

function Protected(props){
    const token = localStorage.getItem("token");
    return(
        <>
            {token ? props.children : <Navigate to={"/Login"} replace />}
        </>
    )
}

export default Protected;
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DataContext} from "../App";

function UnProtected(props){
    const token = localStorage.getItem("token");
    return(
        <>
            {token ? <Navigate to={"/"} replace /> :  props.children}
        </>
    )
}

export default UnProtected;
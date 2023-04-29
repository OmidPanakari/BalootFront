import axios from "axios";
import {useNavigate} from "react-router-dom";

function Protected(props){
    const navigate = useNavigate();
    if (localStorage.getItem("token") === null)
        navigate("/login");
    return(
        <>
            {props.children}
        </>
    )
}

export default Protected;
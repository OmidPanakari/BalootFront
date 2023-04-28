import axios from "axios";
import {useNavigate} from "react-router-dom";

function Protected(){
    const baseUrl = "http://localhost:8080/auth/";
    const navigate = useNavigate()
    async function checkLogin(){
        let temp = await axios.get(baseUrl);
        if(!temp.data.data || !temp.data.success)
            navigate("/login")
    }
    checkLogin()
    return(
        <>
        </>
    )
}

export default Protected;
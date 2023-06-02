import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DataContext} from "../context/DataContext";
import {apiService} from "../services/apiService";
import {AlertContext} from "../context/AlertContext";

function OAuth(){
    const oAuthURL = "/users/oAuth";
    const authUrl = "/auth/";
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const code = urlParams.get("code")
    const {user, setUser} = useContext(DataContext)
    const {sendAlert} = useContext(AlertContext)
    async function OAuthRequest() {
        let res = await apiService.postRequest(oAuthURL,
            {
                code: code,
            }
        );
        if(res.success === true){
            localStorage.setItem("token", res.data)
            let response = await apiService.getRequest(authUrl);
            if (response.data.success === true) {
                setUser(response.data.data, () => navigate("/"));
            }
            else {
                sendAlert(response.data.message)
                navigate("/login");
            }
        }
        else {
            sendAlert(res.message)
            navigate("/login");
        }
    }

    useEffect(() => {
        OAuthRequest();
    }, [])
}

export default OAuth
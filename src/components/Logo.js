import logo from "../assets/images/Logo.png"
import {useNavigate} from "react-router-dom";
function Logo() {
    const navigate = useNavigate();
    return (
        <div className="logo-container d-flex align-items-center justify-content-between" onClick={() => navigate("/")}>
            <img className="logo" src={logo} alt="Logo"></img>
            <h1 className="m-1 logo-text">Baloot</h1>
        </div>
    );
}

export default Logo;

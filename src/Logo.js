import logo from "./Images/Logo.png"
function Logo() {
    return (<div className="d-flex align-items-center justify-content-between">
        <img className="logo" src={logo} alt="Logo"></img>
            <h1 className="m-1 logo-text">Baloot</h1>
    </div>);
}

export default Logo;

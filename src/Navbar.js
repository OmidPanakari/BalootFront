import Button from "./Button";
import Logo from "./Logo";
import Search from "./Search";

function Navbar() {
    return (<header>
        <nav className="navbar shadow fixed-top px-3">
            <div className="container-fluid d-flex justify-content-between">
                <Logo />
                <Search />
                <div>
                    <Button className = "nav-btn" buttonName = "Register" />
                    <Button className = "nav-btn" buttonName = "Login" />
                </div>
            </div>
        </nav>
    </header>);
}

export default Navbar;

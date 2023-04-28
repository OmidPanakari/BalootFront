import Button from "./Button";
import Logo from "./Logo";
import Search from "./Search";
import {DataContext} from "./App";
import {useContext} from "react";

function Navbar(props) {
    let value = useContext(DataContext);
    return (
        <header>
            <nav className="navbar shadow fixed-top px-3">
                <div className="container-fluid d-flex justify-content-between">
                    <Logo/>
                    {props.search && <Search setState={props.setState}/>}
                    {props.buttons &&
                        <div>
                            <Button className="nav-btn" buttonName="Register"/>
                            <Button className="nav-btn" buttonName="Login"/>
                        </div>
                    }

                </div>
            </nav>
        </header>
    );
}

export default Navbar;

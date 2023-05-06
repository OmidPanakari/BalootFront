import Logo from "./Logo";
import Search from "./Search";
import {DataContext} from "./App";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

function calculateItemsCount(buyList){
    let temp = 0;
    buyList.map((object, i) => {
        temp += object.inCart;
    })
    return temp;
}
function Navbar(props) {
    let {user, setUser} = useContext(DataContext);
    const navigate = useNavigate();
    return (
        <header>
            <nav className="navbar shadow fixed-top px-3">
                <div className="container-fluid d-flex justify-content-between">
                    <Logo/>
                    {props.search && <Search setState={props.setState}/>}
                    {props.buttons &&
                        <div className="d-flex justify-content-between">
                            <div className="mx-2 d-flex align-items-center">
                                <p className="item-title-text">{user.username}</p>
                            </div>
                            <div onClick={() => navigate("/cart")}
                                 className={`d-flex justify-content-between mx-2 px-3 py-2 cart-card${calculateItemsCount(user.buyList) === 0 ? "-empty" : ""}`}>
                                <p>Cart</p>
                                <p>{calculateItemsCount(user.buyList)}</p>
                            </div>
                        </div>
                    }

                </div>
            </nav>
        </header>
    );
}

export default Navbar;

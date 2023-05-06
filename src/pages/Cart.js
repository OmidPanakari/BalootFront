import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {useContext, useEffect, useState} from "react";
import CartList from "../components/CartList";
import {apiService} from "../services/apiService";
import BuyModal from "../components/BuyModal";
import cartIcon from "../assets/images/cart.svg";
import historyIcon from "../assets/images/history.svg";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CreditModal from "../components/CreditModal";
import {AlertContext} from "../context/AlertContext";
import {DataContext} from "../context/DataContext";

function Cart() {
    const {sendAlert} = useContext(AlertContext);
    let {user, setUser} = useContext(DataContext);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [creditOpen, setCreditOpen] = useState(false);
    const [credit, setCredit] = useState();
    const navigate = useNavigate();

    const showFactor = () => {
        setOpen(true);
    }

    const closeFactor = () => {
        setOpen(false);
        getCart()
    }

    const closeCreditModal = () => {
        setCreditOpen(false);
    }

    async function getCart() {
        const res = await apiService.getRequest("/users/cart");

        if (!res.success) {
            sendAlert(res.message);
        } else {
            setUser({...user, buyList: res.data.buyList, purchased: res.data.purchasedList});
        }

    }

    useEffect(() => {
        getCart()
    }, [])

    const showAddCreditModal = (e) => {
        e.preventDefault();
        setCreditOpen(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            {loading ? <CircularProgress/> : <>
                <Navbar buttons = {true}/>
                <main>
                    <div className="container">
                        <div className="row shadow mb-5">
                            <div className="col-12 col-sm-6">
                                <ul>
                                    <li className="profile-info item-title-text username"> {user.username}</li>
                                    <li className="profile-info item-title-text email"> {user.email}</li>
                                    <li className="profile-info item-title-text date"> {user.birthDate}</li>
                                    <li className="profile-info item-title-text location"> {user.address}</li>
                                </ul>
                                <button className="brown-btn ms-4" onClick={logout}>Logout</button>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h1 className="price-title"><span className="price-sign">$</span>{user.credit}</h1>
                                <form className="w-100" onSubmit={showAddCreditModal}>
                                    <label className="py-1 w-100">
                                        <input name="amount" className="form-control w-100 add-credit-input text-center" type="text"
                                               value={credit} onChange={(e) => setCredit(e.target.value)}
                                               placeholder="$Amount"/>
                                    </label>
                                    <button type="submit" className="brown-btn my-2 w-100">Add More Credit</button>
                                </form>
                            </div>
                        </div>
                        <div className="w-100 my-4">
                            <h2 className="cart-title"><img className="cart-icon me-1" src={cartIcon}
                                                            alt="cart-icon"/>Cart
                            </h2>
                        </div>
                        <table className="table table-striped">
                            <thead>
                            <tr className="shadow">
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Categories</th>
                                <th scope="col">Price</th>
                                <th scope="col">Provider ID</th>
                                <th scope="col">Rating</th>
                                <th scope="col">In Stock</th>
                                <th scope="col">InCart</th>
                            </tr>
                            </thead>
                            <tbody>
                            <CartList commodities = {user.buyList} purchased = {false}/>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <button className="brown-btn my-2 w-50" disabled={!user.buyList || !user.buyList.length} onClick={showFactor}>Pay</button>
                        </div>
                        <div className="w-100 my-4">
                            <h2 className="cart-title"><img className="cart-icon me-1" src={historyIcon}
                                                            alt="history-icon"/>History</h2>
                        </div>
                        <table className="table table-striped">
                            <thead>
                            <tr className="shadow">
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Categories</th>
                                <th scope="col">Price</th>
                                <th scope="col">Provider ID</th>
                                <th scope="col">Rating</th>
                                <th scope="col">In Stock</th>
                                <th scope="col">InCart</th>
                            </tr>
                            </thead>
                            <tbody>
                            <CartList commodities = {user.purchased} purchased = {true}/>
                            </tbody>
                        </table>
                    </div>
                    <BuyModal open={open} buyList={user.buyList} close={closeFactor}/>
                    <CreditModal open={creditOpen} credit={credit} close={closeCreditModal}/>
                </main>
                <Footer/>
            </>}
        </>
    );
}

export default Cart;
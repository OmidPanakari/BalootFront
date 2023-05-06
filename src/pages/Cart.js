import Navbar from "../Navbar";
import Footer from "../Footer";
import {AlertContext, DataContext} from "../App";
import {useContext, useEffect, useState} from "react";
import CartList from "../CartList";
import {apiService} from "../services/apiService";
import BuyModal from "../BuyModal";
import {CircularProgress} from "@mui/material";

function Cart() {
    const {sendAlert} = useContext(AlertContext);
    let {user, setUser} = useContext(DataContext);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const showFactor = () => {
        setOpen(true);
    }

    const closeFactor = () => {
        setOpen(false);
    }

    async function getCart(event) {
        console.log(user.buyList)
        setLoading(true)
        const res = await apiService.getRequest("/users/cart")

        if (!res.success) {
            setLoading(false)
            sendAlert(res.message);
            setUser({...user, credit: user.credit - Number(event.target.amount.value)})
        } else {
            setLoading(false)
            console.log(JSON.stringify(res.data.buyList))
            console.log(JSON.stringify(user.buyList))
            if(JSON.stringify(res.data.buyList) !== JSON.stringify(user.buyList))
                setUser({...user, buyList: res.data.buyList, purchased: res.data.purchasedList})
        }

    }

    useEffect(() => {
        getCart()
    }, [])

    async function addCredit(event) {
        event.preventDefault();
        setUser({...user, credit: user.credit + Number(event.target.amount.value)})
        const res = await apiService.putRequest("/users/credit", {credit: event.target.amount.value})
        if (!res.success) {
            sendAlert(res.message);
            setUser({...user, credit: user.credit - Number(event.target.amount.value)})
        }
    }

    return (
        <>
            {loading ? <CircularProgress/> : <>
                <Navbar buttons={true}/>
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
                            </div>
                            <div className="col-12 col-sm-6">
                                <h1 className="price-title"><span className="price-sign">$</span>{user.credit}</h1>
                                <form className="w-100" onSubmit={addCredit}>
                                    <label className="py-1 w-100">
                                        <input name="amount" className="form-control w-100 add-credit-input text-center"
                                               type="text"
                                               placeholder="$Amount"/>
                                    </label>
                                    <button type="submit" className="brown-btn my-2 w-100">Add More Credit</button>
                                </form>
                            </div>
                        </div>
                        <div className="w-100 my-4">
                            <h2 className="cart-title"><img className="cart-icon me-1" src="Images/cart.svg"
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
                            <CartList commodities={user.buyList} purchased={false}/>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <button className="brown-btn my-2 w-50" onClick={showFactor}>Pay</button>
                        </div>
                        <div className="w-100 my-4">
                            <h2 className="cart-title"><img className="cart-icon me-1" src="Images/history.svg"
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
                                <th scope="col">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <CartList commodities={user.purchased} purchased={true}/>
                            </tbody>
                        </table>
                    </div>
                    <BuyModal open={open} buyList={user.buyList} close={closeFactor}/>
                </main>
                <Footer/></>}
        </>
    );
}

export default Cart;
import Navbar from "../Navbar";
import Button from "../Button";
import CommodityCard from "../CommodityCard";
import Footer from "../Footer";
import CartItem from "../CartItem";

function Cart() {
    return (
        <>
            <Navbar/>
            <main>
                <div className="container">
                    <div className="row shadow mb-5">
                        <div className="col-12 col-sm-6">
                            <ul>
                                <li className="profile-info item-title-text username"> Marshall</li>
                                <li className="profile-info item-title-text email"> Marshall.Mathers@gmail.com</li>
                                <li className="profile-info item-title-text date"> 1972/10/17</li>
                                <li className="profile-info item-title-text location"> 20785 Schultes Avenue, Warren, Ml
                                    48092
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h1 className="price-title"><span className="price-sign">$</span>10000000</h1>
                            <form className="w-100">
                                <label className="py-1 w-100">
                                    <input className="form-control w-100 add-credit-input text-center" type="text"
                                           placeholder="$Amount"/>
                                </label>
                                <button className="brown-btn my-2 w-100">Add More Credit</button>
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
                        <tr className="item-separator"></tr>
                        <CartItem/>
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="brown-btn my-2 w-50">Pay</button>
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
                            <th scope="col">InCart</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="item-separator"></tr>
                        <CartItem/>
                        <tr className="item-separator"></tr>
                        <CartItem/>
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Cart;
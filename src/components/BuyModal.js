import {Box, Modal} from "@mui/material";
import {useContext, useState} from "react";
import {apiService} from "../services/apiService";
import {AlertContext} from "../context/AlertContext";
import {DataContext} from "../context/DataContext";

function BuyModal(props) {
    const {open, buyList, close} = props;
    const {sendAlert} = useContext(AlertContext);
    const {setUser} = useContext(DataContext)
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(null);

    const closeDialog = () => {
        setDiscount(null);
        setDiscountCode("");
        close();
    }

    const buy = async () => {
        const response = await apiService.putRequest("/users/cart", {
            action: "buy",
            discount: discount == null ? null : discount.discountCode
        });
        if (!response.success) {
            sendAlert(response.message);
        }
        else {
            closeDialog();
        }
    }

    const submitDiscount = async () => {
        const response = await apiService.getRequest(`/discounts/${discountCode}`);
        if (response.success) {
            setDiscount(response.data);
        }
        else {
            sendAlert(response.message);
        }
    }

    return (
        <Modal open={open}>
            <Box className="buy-box p-2">
                <p className="mx-3 mt-2 mb-4 factor-title">Your cart</p>
                <ul>
                    {buyList.map((item) => {
                        return <li className="mx-4 factor-item">
                            <div className="d-flex justify-content-between">
                                <div>{item.commodity.name} x {item.inCart}</div>
                                <div className="factor-price">{item.commodity.price * item.inCart}$</div>
                            </div>
                        </li>
                    })}
                </ul>
                <div className="ms-3 me-1 row">
                    <div className="col-8">
                        <input className="form-control w-100 add-credit-input" type="text"
                               value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
                               placeholder="Code"/>
                    </div>
                    <div className="col-4">
                        <button className="brown-btn" disabled={discount != null}
                                onClick={submitDiscount}>{discount == null ? "Submit" : "Submitted"}</button>
                    </div>
                </div>
                <div className="mx-3 px-3 pt-3 d-flex justify-content-between">
                    <div className="factor-item">Total</div>
                    <div className={discount == null ? "remaining-text" : "remaining-text-crossed"}>{buyList.reduce((ps, item) => ps + item.commodity.price * item.inCart, 0)}$</div>
                </div>
                { discount != null &&
                    <div className="mx-3 px-3 pb-3 pt-1 d-flex justify-content-between">
                        <div className="factor-item">With discount</div>
                        <div className="remaining-text">{Math.floor((buyList.reduce((ps, item) => ps + item.commodity.price * item.inCart, 0)) * discount.discount / 100)}$</div>
                    </div>
                }
                <div className="mt-4 mx-3 d-flex justify-content-end">
                    <button className="mx-2 red-btn" onClick={closeDialog}>Close</button>
                    <button className="brown-btn" onClick={buy}>Buy!</button>
                </div>
            </Box>
        </Modal>
    );
}

export default BuyModal;
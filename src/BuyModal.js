import {Box, Modal} from "@mui/material";
import {useContext} from "react";
import {AlertContext} from "./App";
import {apiService} from "./services/apiService";

function BuyModal(props) {
    const {open, buyList, close} = props;
    const {sendAlert} = useContext(AlertContext);
    const discount = null;
    const buy = async () => {
        const response = await apiService.putRequest("/users/cart", {
            action: "buy",
            discount
        })
        if (!response.success) {
            sendAlert(response.message);
        }
        else {
            close();
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
                <div className="mx-3 row">
                    <div className="col-8">
                        <input className="form-control w-100 add-credit-input" type="text"
                               placeholder="Code"/>
                    </div>
                    <div className="col-4">
                        <button className="brown-btn">Submit</button>
                    </div>
                </div>
                <div className="mx-3 p-3 d-flex justify-content-between">
                    <div className="factor-item">Total</div>
                    <div className="remaining-text">{buyList.reduce((ps, item) => ps + item.commodity.price * item.inCart, 0)}$</div>
                </div>
                <div className="mt-4 mx-3 d-flex justify-content-end">
                    <button className="mx-2 red-btn" onClick={close}>Close</button>
                    <button className="brown-btn" onClick={buy}>Buy!</button>
                </div>
            </Box>
        </Modal>
    );
}

export default BuyModal;
import {Box, Modal} from "@mui/material";
import {useContext, useState} from "react";
import {apiService} from "../services/apiService";
import {AlertContext} from "../context/AlertContext";
import {DataContext} from "../context/DataContext";

function CreditModal(props) {
    const {open, credit, close} = props;
    const {sendAlert} = useContext(AlertContext);
    let {user, setUser} = useContext(DataContext);

    async function addCredit() {
        setUser({...user, credit: user.credit + Number(credit)});
        const res = await apiService.putRequest("/users/credit", {credit});
        close();
        if (!res.success) {
            sendAlert(res.message);
            setUser({...user, credit: user.credit - Number(credit)});
        }

    }

    return (
        <Modal open={open}>
            <Box className="buy-box p-2">
                <p className="mx-3 mt-2 mb-4 factor-title">Add Credit</p>
                <p className="mx-3 confirm-text">Are you sure you want to add {credit}$ to your account?</p>
                <div className="mt-4 mx-3 d-flex justify-content-end">
                    <button className="mx-2 red-btn" onClick={close}>Close</button>
                    <button className="brown-btn" onClick={addCredit}>Confirm!</button>
                </div>
            </Box>
        </Modal>
    );
}

export default CreditModal;
import {useContext, useEffect, useState} from "react";
import {apiService} from "../services/apiService";
import {DataContext} from "../context/DataContext";
import {AlertContext} from "../context/AlertContext";

function CommodityButton(props){
    const [count, setCount] = useState(0);
    const [stock, setStock] = useState(0);
    useEffect(() => {
        setCount(props.count)
        setStock(props.commodity.inStock)
    }, [props.commodity])
    const {user, setUser} = useContext(DataContext);
    const {sendAlert} = useContext(AlertContext);

    async function getCart() {
        const res = await apiService.getRequest("/users/cart");

        if (!res.success) {
            sendAlert(res.message);
        } else {
            setUser({...user, buyList: res.data.buyList, purchased: res.data.purchasedList})
        }

    }

    const addToCart = async (e) => {
        e.stopPropagation();
        console.log("Ok Here")
        setStock((pre) => pre - 1);
        setCount((pre) => pre + 1);
        props.setInStock((pre) => pre - 1);
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodity.id,
            action: "add"
        });
        if (!resp.success) {
            setStock((pre) => pre + 1);
            setCount((pre) => pre - 1);
            props.setInStock((pre) => pre + 1);
            sendAlert(resp.message);
        } else {
            await getCart();
        }
    }

    const removeFromCart = async (e) => {
        e.stopPropagation();
        setStock((pre) => pre + 1);
        setCount((pre) => pre - 1);
        props.setInStock((pre) => pre + 1);
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodity.id,
            action: "remove"
        });
        if (!resp.success) {
            setStock((pre) => pre - 1);
            setCount((pre) => pre + 1);
            props.setInStock((pre) => pre - 1);
            sendAlert(resp.message);
        } else {
            await getCart();
        }
    }

    if (count === 0) {
        return (<button disabled={stock === 0} onClick={addToCart} className="white-button">add to cart</button>);
    }
    else {
        return (
        <div className="d-flex justify-content-between py-2 px-3 input-number">
            <button onClick={removeFromCart} className="adjust-btn">-</button>
            <p>{count}</p>
            <button disabled={stock === 0} onClick={addToCart} className="adjust-btn">+</button>
        </div>
        );
    }
}
export default CommodityButton
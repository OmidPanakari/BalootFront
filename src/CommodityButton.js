import {useState} from "react";
import {apiService} from "./services/apiService";

function CommodityButton(props){
    const [count, setCount] = useState(props.count);
    const addToCart = async (e) => {
        e.stopPropagation();
        setCount((prev) => prev + 1);
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodityId,
            action: "add"
        });
        if (!resp.success) {
            alert(resp.message);
            setCount((prev) => prev - 1);
        }
    }
    const removeFromCart = async (e) => {
        e.stopPropagation();
        setCount((prev) => prev - 1);
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodityId,
            action: "remove"
        });
        if (!resp.success) {
            alert(resp.message);
            setCount((prev) => prev + 1);
        }
    }
    if (count === 0) {
        return (<button onClick={addToCart} className="white-button">add to cart</button>);
    }
    else {
        return (
        <div className="d-flex justify-content-between py-2 px-3 input-number">
            <button onClick={removeFromCart} className="adjust-btn">-</button>
            <p>{count}</p>
            <button onClick={addToCart} className="adjust-btn">+</button>
        </div>
        );
    }
}
export default CommodityButton
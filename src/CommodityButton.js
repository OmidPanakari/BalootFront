import {useContext, useEffect, useState} from "react";
import {apiService} from "./services/apiService";
import {DataContext} from "./App";
import {useNavigate} from "react-router-dom";

function addToBuyList(currBuyList, item){
    let temp = false;
    currBuyList.map((object, i) => {
        if (object.commodity.id === item.id){
            object.inCart++;
            temp = true;
        }
    })

    if (!temp){
        currBuyList.push({commodity: item, inCart: 1})
    }
}

function removeFromBuyList(currBuyList, item){
    currBuyList.map((object, i) => {
        if (object.commodity.id === item.id) object.inCart--;
        if (object.inCart === 0) currBuyList.splice(i, 1);
    })
}

function CommodityButton(props){
    const [count, setCount] = useState(0);
    const [stock, setStock] = useState(0);
    useEffect(() => {
        setCount(props.count)
        setStock(props.commodity.inStock)
    }, [props.commodity])
    const {user, setUser} = useContext(DataContext)
    const addToCart = async (e) => {
        e.stopPropagation();
        let tempList = user.buyList;
        addToBuyList(tempList, props.commodity)
        setCount((prev) => prev + 1);
        setUser({...user, buyList: tempList})
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodity.id,
            action: "add"
        });
        if (!resp.success) {
            alert(resp.message);
            removeFromBuyList(tempList, props.commodity)
            setCount((prev) => prev - 1);
        } else {
            props.setInStock(resp.data)
            setStock(resp.data)
        }
    }
    const removeFromCart = async (e) => {
        e.stopPropagation();
        let tempList = user.buyList;
        setCount((prev) => prev - 1);
        removeFromBuyList(tempList, props.commodity)
        setUser({...user, buyList: tempList})
        const resp = await apiService.putRequest("/users/cart", {
            commodityId: props.commodity.id,
            action: "remove"
        });
        if (!resp.success) {
            alert(resp.message);
            setCount((prev) => prev + 1);
            addToBuyList(tempList, props.commodity)
            setUser({...user, buyList: tempList})
        } else {
            props.setInStock(resp.data)
            setStock(resp.data)
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
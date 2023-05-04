import CartItem from "./CartItem";
import CommodityCard from "./CommodityCard";

function CartList(props){
    return(
        <>
            {props.commodities.map(function(object, i){
                return (
                    <>
                        <tr className="item-separator"></tr>
                        <CartItem commodity = {object} purchased ={props.purchased}/>
                    </>
            );
            })}
        </>
    )
}
export default CartList;
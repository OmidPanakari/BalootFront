import CartItem from "./CartItem";


function CartList(props){
    return(
        <>
            {props.commodities.map(function(object, i){
                return (
                    <>
                        <tr className="item-separator"></tr>
                        <CartItem inCart = {object.inCart} commodity = {object.commodity} purchased ={props.purchased}/>
                    </>
            );
            })}
        </>
    )
}
export default CartList;
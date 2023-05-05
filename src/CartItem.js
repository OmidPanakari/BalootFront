import Thumbnail from "./Images/thumbnail.png"
import CommodityButton from "./CommodityButton";
function CartItem(props){
    console.log(props)
    return(
        <tr className="shadow">
            <td scope="row"><img className="item-image" src={props.commodity.image} alt="commodity-image"/>
            </td>
            <td>{props.commodity.name}</td>
            <td>{props.commodity.categories}</td>
            <td>${props.commodity.price}</td>
            <td>{props.commodity.providerId}</td>
            <td className="rating-text">{props.commodity.rating}</td>
            <td className="remaining-text">{props.commodity.inStock}</td>
            <td>
                <CommodityButton count={props.inCart} commodity={props.commodity}/>
            </td>
        </tr>
    )
}
export default CartItem;
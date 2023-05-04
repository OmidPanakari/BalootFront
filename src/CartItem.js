import Thumbnail from "./Images/thumbnail.png"
function CartItem(props){
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
                <div className="d-flex justify-content-between py-2 px-3 input-number">
                    {!props.purchased && <button className="adjust-btn">-</button>}
                    <p>1</p>
                    {!props.purchased && <button className="adjust-btn">+</button>}
                </div>
            </td>
        </tr>
    )
}
export default CartItem;
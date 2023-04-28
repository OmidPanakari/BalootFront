import Thumbnail from "./Images/thumbnail.png"
function CartItem(){
    return(
        <tr className="shadow">
            <td scope="row"><img className="item-image" src={Thumbnail}alt="commodity-image"/>
            </td>
            <td>Galaxy S21</td>
            <td>Technology, Phone</td>
            <td>$2100000000</td>
            <td>1234</td>
            <td className="rating-text">8.3</td>
            <td className="remaining-text">17</td>
            <td>
                <div className="d-flex justify-content-between py-2 px-3 input-number">
                    <button className="adjust-btn">-</button>
                    <p>1</p>
                    <button className="adjust-btn">+</button>
                </div>
            </td>
        </tr>
    )
}
export default CartItem;
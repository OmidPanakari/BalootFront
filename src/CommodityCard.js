import CommodityButton from "./CommodityButton";
import {useNavigate} from "react-router-dom";

function CommodityCard(props){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/commodity/${props.commodity.id}`);
    }
    return(
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card shadow item-card" onClick={handleClick}>
                <div className="card-body">
                    <h2 className="item-title-text">{props.commodity.name}</h2>
                    <h3 className="item-stock-text">{props.commodity.inStock} left in stock</h3>
                    <img className="w-100 pb-2 com-item-image" src = {props.commodity.image} alt="thumbnail"></img>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="item-price-text">{props.commodity.price}$</h2>
                        <CommodityButton count={props.inCart} commodity={props.commodity}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommodityCard;
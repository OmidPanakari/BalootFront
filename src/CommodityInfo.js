import Thumbnail from "./Images/thumbnail.png";
import Star from "./Images/star.png";
import CommodityButton from "./CommodityButton";
import {Rating} from "@mui/material";
import {apiService} from "./services/apiService";
import {useEffect, useState} from "react";

function CommodityInfo(props) {
    const {commodity, inCart} = props;
    const [userRating, setUserRating] = useState(0);
    const [inStock, setInStock] = useState(0)
    useEffect(() => {
        setInStock(props.commodity.inStock)
    }, [props.commodity])
    const addRating = async () => {
        const response = await apiService.postRequest(`/commodities/${commodity.id}/ratings`, {rate: userRating});
        if (!response.success) {
            alert(response.message);
        }
    }
    return (
        <div className="container row">
            <div className="col-lg-6 col-sm-12">
                <img className="w-100 com-item-image p-2" src={commodity.image} alt="thumbnail"/>
            </div>
            <div className="col-lg-6 col-sm-12">
                <strong className="title-text">{commodity.name}</strong>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="stock-text">{inStock} in stock</h3>
                    <div className="d-flex align-items-baseline">
                        <img className="rating" src={Star} alt="rate"/>
                        <p className="filter-text">{commodity.rating}</p>
                        <p className="subtitle mb-0">({commodity.rateCount})</p>
                    </div>
                </div>
                <h4 className="provider-text">by <a href="#">{commodity.providerName}</a></h4>
                <h4 className="category-text mb-2">Category(s)</h4>
                <ul className="category-text">
                    {commodity.categories.map((cat) => {
                        return <li>{cat}</li>
                    } )}
                </ul>
                <div className="price-card d-flex justify-content-between align-items-center shadow p-3">
                    <h2 className="price-text px-4 py-2">{commodity.price}$</h2>
                    <CommodityButton setInStock = {setInStock} count={inCart} commodity={commodity}/>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 m-3">
                    <div>
                        <p>rate now</p>
                        <div className="row bg-white gx-1">
                            <Rating name="rating-10" value={userRating} max={10}
                                    onChange={(e, newVal) => setUserRating(newVal)}/>
                        </div>
                    </div>
                    <button type="submit" className="white-button" onClick={addRating}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default CommodityInfo
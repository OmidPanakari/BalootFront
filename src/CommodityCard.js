import Button from "./Button";

function CommodityCard(props){
    return(
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="item-title-text">{props.commodity.name}</h2>
                    <h3 className="item-stock-text">{props.commodity.inStock} left in stock</h3>
                    <img className="w-100" src= {require("./Images/thumbnail.png")} alt="thumbnail"></img>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="item-price-text">{props.commodity.price}$</h2>
                        <Button className = "white-button" type = "submit" buttonName = "add to cart"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommodityCard;
import CommodityCard from "./CommodityCard";

function CommodityList(props){
    return(
        <>
            {props.commodities.map(function(object, i){
                return <CommodityCard inCart={object.inCart} commodity ={object.commodity} />;
            })}
        </>
    )
}

export default CommodityList;
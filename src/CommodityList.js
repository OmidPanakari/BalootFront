import CommodityCard from "./CommodityCard";

function CommodityList(props){
    return(
        <>
            {props.commodities.map(function(object, i){
                return <CommodityCard commodity ={object.commodity} />;
            })}
        </>
    )
}

export default CommodityList;
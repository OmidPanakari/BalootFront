import CommodityCard from "./CommodityCard";

function CommodityList(props){
    return(
        <>
            {props.commodities.map(function(object, i){
                return <CommodityCard commodity ={object} />;
            })}
        </>
    )
}

export default CommodityList;
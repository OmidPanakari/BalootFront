import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {apiService} from "../services/apiService";
import CommodityList from "../components/CommodityList";
import {AlertContext} from "../context/AlertContext";

function Provider(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState({});
    const {sendAlert} = useContext(AlertContext);

    const getData = async () => {
        setLoading(true);
        const response = await apiService.getRequest(`/providers/${id}`);
        console.log(response);
        if (response.success)
        {
            setProvider(response.data);
            setLoading(false);
        }
        else {
            sendAlert(response.message);
        }
    }

    useEffect(() => {
        getData();
    }, [id])
    if (loading) {
        return (<CircularProgress/>);
    }
    else {
        return (
            <>
                <Navbar buttons={true}/>
                <main>
                    <div className="container">
                        <div className="container provider-container my-5">
                            <div className="d-flex justify-content-center">
                                <div>
                                    <img className="provider-image w-100" alt="provider" src={provider.provider.image}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end provider-date pe-2">Since {new Date(provider.provider.registryDate).getFullYear()}</div>
                            <div className="provider-title">{provider.provider.name}</div>
                        </div>
                        <div className="row">
                            <h2 className="filter-text mt-5 mb-2">All provided commodities</h2>
                            <div className="row g-3">
                                <CommodityList commodities={provider.commodities}/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </>
        )
    }
}
export default Provider;
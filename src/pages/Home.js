import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import CommodityCard from "../components/CommodityCard";
import {useEffect, useState} from "react";
import axios from "axios";
import CommodityList from "../components/CommodityList";
import {Pagination} from "@mui/material";
import {apiService} from "../services/apiService";

function Home() {
    const baseURL = "http://localhost:8080/commodities";
    const [commodities, setCommodities] = useState({
        comms: [],
        available: false,
        sortByName: true,
        searchText: "",
        searchType: "name",
        currentPage: 1,
        totalPages: 10
    })

    useEffect(() => {
        async function getComms() {
            let temp = await apiService.getRequest("/commodities",
                {
                    page: commodities.currentPage,
                    limit: 12,
                    searchType: commodities.searchType,
                    search: commodities.searchText,
                    sort: commodities.sortByName ? "name" : "price",
                    available: commodities.available
                }
            );
            console.log(temp)
            setCommodities({...commodities, comms: temp.data.commodities, totalPages: temp.data.pageCount})
        }

        getComms().then(r => console.log("caught!"));
    }, [commodities.available, commodities.sortByName, commodities.searchType, commodities.searchText, commodities.currentPage]);

    function availableChange() {
        setCommodities({...commodities, available: !commodities.available})
    }

    function sortChange() {
        setCommodities({...commodities, sortByName: !commodities.sortByName})
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setCommodities({...commodities, currentPage: newPage})
    };

    return (
        <>
            <Navbar setState={setCommodities} buttons={true} search={true}/>
            <main>
                <div className="container">
                    <div className="container filter-bar d-flex justify-content-between p-1 align-items-center mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="p-3 filter-text">Available commodities</h2>
                            <input type="checkbox" id="avl-check" onChange={availableChange}
                                   checked={commodities.available}></input>
                            <label htmlFor="avl-check"></label>
                        </div>
                        <div className="d-flex justify-content-around align-items-center float-right">
                            <h2 className="p-3 item-title-text">sort by:</h2>
                            <input type="radio" name="sort-option" id="sort-name" className="radio-button"
                                   onChange={sortChange} checked={commodities.sortByName}></input>
                            <label className="p-2 item-title-text" htmlFor="sort-name">
                                <button className="">name</button>
                            </label>
                            <input type="radio" name="sort-option" id="sort-price" className="radio-button"
                                   onChange={sortChange} checked={!commodities.sortByName}></input>
                            <label className="p-2 item-title-text" htmlFor="sort-price">
                                <button className="">price</button>
                            </label>
                        </div>
                    </div>
                    <div className="row g-3">
                        <CommodityList commodities={commodities.comms}/>
                        {commodities.totalPages > 1 &&
                            <Pagination className="commodity-pagination" count={commodities.totalPages}
                                        onChange={handleChangePage}/>}

                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
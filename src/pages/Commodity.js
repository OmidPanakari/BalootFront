import Navbar from "../Navbar";
import Footer from "../Footer";
import CommodityCard from "../CommodityCard";
import Comment from "../Comment";
import Star from "../Images/star.png"
import Thumbnail from "../Images/thumbnail.png"
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {apiService} from "../services/apiService";
import {CircularProgress} from "@mui/material";
import CommodityList from "../CommodityList";
import CommodityInfo from "../CommodityInfo";
import {AlertContext} from "../App";

function Commodity() {
    const {id} = useParams();
    const {sendAlert} = useContext(AlertContext);
    const [commentText, setCommentText] = useState("");
    const [commodity, setCommodity] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true)

    const getCommodity = async () => {
        let response = await apiService.getRequest(`/commodities/${id}`);
        if (!response.success) {
            sendAlert(response.message);
        }
        setCommodity(response.data);
    }

    const getSuggestions = async () => {
        let response = await apiService.getRequest(`/commodities/${id}/suggestions`);
        if (!response.success) {
            sendAlert(response.message);
        }
        setSuggestions(response.data);
    }

    const getComments = async () => {
        let response = await apiService.getRequest(`/commodities/${id}/comments`);
        if (!response.success) {
            sendAlert(response.message);
        }
        setComments(response.data);
    }

    const getData = async () => {
        await getCommodity();
        await getSuggestions();
        await getComments();
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [id]);

    const postComment = async (e) => {
        e.preventDefault();
        const response = await apiService.postRequest(`/commodities/${commodity.commodity.id}/comments`, {
            text: commentText
        });
        if (!response.success) {
            sendAlert(response.message);
        }
        else {
            await getComments();
        }
    }
    return (
        <>
            {loading ? <CircularProgress/> :
                <div>
                    <Navbar/>
                    <main>
                        <div className="container">
                            <CommodityInfo commodity={commodity.commodity} inCart={commodity.inCart}/>
                            <div className="container bg-white shadow px-0">
                                <div className="d-flex align-items-center px-2 m-0">
                                    <h2 className="comment-title">Comments<span className="count-text ms-2">({comments.length})</span></h2>
                                </div>
                                {comments.map((comment) => (
                                    <div>
                                        <Comment comment={comment}/>
                                        <div className="comment-separator"></div>
                                    </div>
                                ))}
                                <div className="px-2 py-2">
                                    <div className="d-flex align-items-center mb-4">
                                        <h4 className="comment-title">Submit your opinion</h4>
                                    </div>
                                    <form id="comment-form">
                                        <div className="row">
                                            <div
                                                className="col-sm-12 col-lg-10 d-flex align-items-end px-0 ps-3 pb-2 pe-sm-3 pe-lg-0">
                                                <textarea className="w-100 comment-area" form="comment-form"
                                                          value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                                            </div>
                                            <div className="col-sm-12 col-lg-2 d-flex align-items-end pb-2">
                                                <button type="submit" className="brown-btn w-100" onClick={postComment}>Post</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <h2 className="filter-text mt-5 mb-2">You might also like...</h2>
                                <div className="row g-3">
                                    <CommodityList commodities={suggestions}/>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            }
        </>
    );
}

export default Commodity;
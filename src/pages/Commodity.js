import Navbar from "../Navbar";
import Footer from "../Footer";
import CommodityCard from "../CommodityCard";
import Comment from "../Comment";
import Star from "../Images/star.png"
import Thumbnail from "../Images/thumbnail.png"
import {useParams} from "react-router-dom";

function Commodity() {
    return (
        <>
        <Navbar/>
        <main>
            <div className="container">
                <div className="container row">
                    <div className="col-lg-6 col-sm-12">
                        <img className="w-100" src={Thumbnail} alt="thumbnail"/>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <strong className="title-text">Title</strong>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="stock-text">5 in stock</h3>
                            <div className="d-flex align-items-baseline">
                                <img className="rating" src={Star} alt="rate"/>
                                <p className="filter-text">4.1</p>
                                <p className="subtitle mb-0">(12)</p>
                            </div>
                        </div>
                        <h4 className="provider-text">by <a href="#">Huawei</a></h4>
                        <h4 className="category-text mb-2">Category(s)</h4>
                        <ul className="category-text">
                            <li>Technology</li>
                            <li>IT</li>
                        </ul>
                        <div className="price-card d-flex justify-content-between align-items-center shadow p-3">
                            <h2 className="price-text px-4 py-2">300$</h2>
                            <button type="submit" className="white-button">add to cart</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center p-3 m-3">
                            <div>
                                <p>rate now</p>
                                <div className="row bg-white gx-1">
                                    <div className="col-xl-6 col-lg-12 col-6">
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>

                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-6">
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                        <img className="rating" src={Star} alt="rate"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="white-button">submit</button>
                        </div>
                    </div>
                </div>
                <div className="container bg-white shadow px-0">
                    <div className="d-flex align-items-center px-2 m-0">
                        <h2 className="comment-title">Comments<span className="count-text ms-2">(2)</span></h2>
                    </div>
                    <Comment/>
                    <div className="comment-separator"></div>
                    <Comment/>
                    <div className="comment-separator"></div>
                    <div className="px-2 py-2">
                        <div className="d-flex align-items-center mb-4">
                            <h4 className="comment-title">Submit your opinion</h4>
                        </div>
                        <form id="comment-form">
                            <div className="row">
                                <div
                                    className="col-sm-12 col-lg-10 d-flex align-items-end px-0 ps-3 pb-2 pe-sm-3 pe-lg-0">
                                    <textarea className="w-100 comment-area" form="comment-form"></textarea>
                                </div>
                                <div className="col-sm-12 col-lg-2 d-flex align-items-end pb-2">
                                    <button type="submit" className="brown-btn w-100">Post</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <h2 className="filter-text mt-5 mb-2">You might also like...</h2>
                    <div className="row g-3">
                        <CommodityCard comName="Name" left="1" price="300" image="thumbnail.png"/>
                        <CommodityCard comName="Name" left="1" price="300" image="thumbnail.png"/>
                        <CommodityCard comName="Name" left="1" price="300" image="thumbnail.png"/>
                        <CommodityCard comName="Name" left="1" price="300" image="thumbnail.png"/>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
        </>
    );
}

export default Commodity;
import arrowDown from "./Images/arrowDown.png"
import {useState} from "react";

function Search(props) {

    const [search, setSearch] = useState({type:"name", text:""})

    function textChange(text){
        setSearch({...search, text: text});
    }

    function searchClicked(){
        props.setState(prevState => ({...prevState, searchType: search.type, searchText: search.text}))
    }
    function changeSearchType(type){
        setSearch({...search, type: type})
    }

    return (
        <div className="p-0 search-bar d-flex justify-content-between">
            <div className="dropdown">
                <div className="search-bar-div d-flex justify-content-between align-items-center">
                    <p className="search-bar-btn search-bar-btn-text">
                        {search.type}
                    </p>
                    <img className="arrow" src={arrowDown} alt="arrow"></img>
                </div>
                <div className="dropdown-content">
                    <button className="search-bar-btn-text" onClick={() => changeSearchType("name")}>name</button>
                    <button className="search-bar-btn-text" onClick={() => changeSearchType("category")}>category</button>
                </div>
            </div>
            <input className="search-bar-text p-3" type="text" placeholder="Search your product..." onChange={value => textChange(value.target.value)}></input>
            <button className= "button-with-image" onClick={searchClicked}><img className="search-img" src={require("./Images/Search.png")} alt="search"/></button>
        </div>
    )
}

export default Search;
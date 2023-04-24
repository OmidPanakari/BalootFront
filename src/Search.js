import search from "./Images/Search.png"
import arrowDown from "./Images/arrowDown.png"

function Search(){
    return(<div className="p-0 search-bar d-flex justify-content-between">
        <div className="dropdown">
            <div className="search-bar-div d-flex justify-content-between align-items-center">
                <p className="search-bar-btn search-bar-btn-text">
                    name
                </p>
                <img className="arrow" src= {arrowDown} alt="arrow"></img>
            </div>
            <div className="dropdown-content">
                <a className="search-bar-btn-text" href="#">name</a>
                <a className="search-bar-btn-text" href="#">category</a>
            </div>
        </div>
        <input className="search-bar-text p-3" type="text" placeholder="Search your product..."></input>
        <img className="search-img" src= {search} alt="search"></img>
    </div>)
}

export default Search;
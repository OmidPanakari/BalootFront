import Like from "./Images/like.svg"
import Dislike from "./Images/dislike.svg"

function Comment(){
    return(
        <div>
            <div className="d-flex align-items-center px-2 pt-2">
                <p>This was awfullllllllll!!!!!</p>
            </div>
            <div className="d-flex px-2 pb-2">
                <p className="subtitle">2023-03-20</p>
                <p className="subtitle px-4">.</p>
                <p className="subtitle">#username</p>
            </div>
            <div className="d-flex justify-content-end px-2 pb-3">
                <span className="question-text mx-2">Is this comment helpful?</span>
                <span className="like-text">1 <img className="like" src={Like}
                                                   alt="like"/></span>
                <span className="like-text">1 <img className="like" src={Dislike}
                                                   alt="dislike"/></span>
            </div>
        </div>
    );
}

export default Comment;
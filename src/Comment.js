import Like from "./Images/like.svg"
import Dislike from "./Images/dislike.svg"

function Comment(props){
    const {comment} = props;
    return(
        <div>
            <div className="d-flex align-items-center px-2 pt-2">
                <p>{comment.text}</p>
            </div>
            <div className="d-flex px-2 pb-2">
                <p className="subtitle">{comment.date}</p>
                <p className="subtitle px-4">.</p>
                <p className="subtitle">{comment.username}</p>
            </div>
            <div className="d-flex justify-content-end px-2 pb-3">
                <span className="question-text mx-2">Is this comment helpful?</span>
                <span className="like-text">{comment.likes} <img className="like" src={Like}
                                                   alt="like"/></span>
                <span className="like-text">{comment.dislikes} <img className="like" src={Dislike}
                                                   alt="dislike"/></span>
            </div>
        </div>
    );
}

export default Comment;
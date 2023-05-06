import Like from "../assets/images/like.svg"
import Dislike from "../assets/images/dislike.svg"
import {useContext, useEffect, useState} from "react";
import {apiService} from "../services/apiService";
import {AlertContext} from "../context/AlertContext";

function Comment(props){
    const {comment} = props;
    const [likes, setLikes] = useState({like: 0, dislike: 0})
    const {sendAlert} = useContext(AlertContext);
    useEffect(() => {
        console.log(comment)
        setLikes({like: comment.likes, dislike: comment.dislikes})
    }, [])
    async function like(){
        const res = await apiService.postRequest("/users/votes", {commentId: comment.id, vote: 1})
        if (res.success){
            setLikes({like: res.data.likes, dislike: res.data.dislikes})
        } else{
            sendAlert(res.message)
        }
    }

    async function dislike(){
        const res = await apiService.postRequest("/users/votes", {commentId: comment.id, vote: -1})
        if (res.success){
            setLikes({like: res.data.likes, dislike: res.data.dislikes})
        } else{
            sendAlert(res.message)
        }
    }
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
                <span className="like-text">{likes.like} <img className="like" src={Like} onClick={like}
                                                   alt="like"/></span>
                <span className="like-text">{likes.dislike} <img className="like" src={Dislike} onClick={dislike}
                                                   alt="dislike"/></span>
            </div>
        </div>
    );
}

export default Comment;
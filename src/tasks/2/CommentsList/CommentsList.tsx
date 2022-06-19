import { useEffect, useState } from "react";
import moment from "moment";
import getDataRequest from '../data/getDataRequest'
import { nestComments } from "../utils/nestComments";

import { CommentType } from "./types/commentDto";
import { AuthorType } from "./types/authorDto";

import "./CommentsList.scss";

const Comment = ({ comment }: { comment: CommentType }) => {
    const author = comment.author as AuthorType;
    const nestedComments = (comment.children || []).map((comment: any) => {
        return <Comment key={comment.id} comment={comment} />;
    });

    const date = moment(comment.created).format("DD.MM.YYYY, HH:mm:ss");

    return (
        <article key={comment.id} className="comment">
            <div className="comment__avatar">
                <img src={author.avatar} alt="avatar" />
            </div>
            <div className="comment__info">
                <h3>{author.name}</h3>
                <span>{date}</span>
            </div>
            <div className="comment__likes">
                <span>❤️ {comment.likes}</span>
            </div>
            <div className="comment__message">
                <p>{comment.text}</p>
            </div>
            {nestedComments}
        </article>
    );
};

const CommentsList = () => {
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        getDataRequest().then(res => {
            setComments(nestComments(res.comments, res.authors));
        }).catch(err =>
            alert("Oops, an error has occured. Please refresh the page.")
        )
    }, [])

    return (
        <section id="comments-list">
            <h2>CommentsList:</h2>
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </section>
    );
};

export default CommentsList;

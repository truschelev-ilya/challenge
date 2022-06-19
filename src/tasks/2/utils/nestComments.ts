import { AuthorType } from "../CommentsList/types/authorDto";
import { CommentType } from "../CommentsList/types/commentDto";

export function nestComments(commentList: CommentType[], authorList: AuthorType[]) {
    const commentMap: any = {};

    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.id] = comment);
    // iterate over the comments again and correctly nest the children with authors
    commentList.forEach(comment => {
        comment.author = authorList.find(el => el.id === comment.author) as AuthorType

        if (comment.parent !== null) {
            const parent = commentMap[comment.parent];
            (parent.children = parent.children || []).push(comment);
        }
    });
    // filter the list to return a list of correctly nested comments
    return commentList.filter(comment => {
        return comment.parent === null;
    });
}
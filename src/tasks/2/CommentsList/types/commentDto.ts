import { AuthorType } from "./authorDto";

export type CommentType = {
    id: number,
    created: Date,
    text: string,
    author: number | AuthorType,
    parent: number,
    likes: number,
    children?: CommentType[]
};
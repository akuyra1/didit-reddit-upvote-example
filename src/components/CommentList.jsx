import { db } from "@/db";
import { CommentForm } from "./CommentForm";
import Image from "next/image";

export async function CommentList({ postId, parentCommentId = null }) {
  const commentQuery = `SELECT comments_2.id, comments_2.body, users.name, users.image FROM comments_2 JOIN users ON comments_2.user_id = users.id WHERE post_id = $1 AND parent_comment_id ${
    parentCommentId ? `= $2` : `IS NULL`
  }`;
  const commentArgs = [postId];

  if (parentCommentId) {
    commentArgs.push(parentCommentId);
  }
  const comments_2 = await db.query(commentQuery, commentArgs);

  return (
    <ul className="ml-4">
      {comments_2.rows.map((comment) => (
        <li key={comment.id} className="pt-2">
          <div className="flex space-x-3 items-center pb-2">
            <img
              src={comment.image}
              alt={comment.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-zinc-400">{comment.name}</span>
          </div>
          <div className="ml-4 border-l border-zinc-300 pl-2 flex flex-col space-y-1">
            <span className="pl-4">{comment.body}</span>
            <CommentForm postId={postId} parentCommentId={comment.id} />
            <CommentList postId={postId} parentCommentId={comment.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}

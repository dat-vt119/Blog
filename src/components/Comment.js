import React, { useContext, useState, useEffect } from "react";
import classes from "./Comment.module.css";
import fb from "../firebase";
import userContext from "../store/user-context";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const date = () => {
  const date = new Date();
  const month =
    Number(date.getMonth()) + Number(1) < 10
      ? "0" + (Number(date.getMonth()) + Number(1))
      : Number(date.getMonth()) + Number(1);

  const time =
    (Number(date.getHours()) < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (Number(date.getMinutes()) < 10
      ? "0" + date.getMinutes()
      : date.getMinutes()) +
    ":" +
    (Number(date.getSeconds()) < 10
      ? "0" + date.getSeconds()
      : date.getSeconds()) +
    " " +
    (Number(date.getDate()) < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    month +
    "/" +
    date.getFullYear();
  return time;
};
const db = fb.firestore();

function Comment() {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const params = useParams();
  const userCtx = useContext(userContext);
  const Blogs = db.collection("blogs" + userCtx.currentUser);

  const commentHandler = (e) => {
    setIsSended(true);
    Blogs.doc(params.blogId)
      .update({
        comments: fb.firestore.FieldValue.arrayUnion({
          userName: userCtx.user.displayName,
          userImage: userCtx.user.photoURL,
          userEmail: userCtx.user.email,
          comment: comment,
          time: date(),
          commentId: uuidv4(),
        }),
      })
      .then(() => {
        setComment("");
        setIsSended(false);
      });
    setIsComment(false);
  };
  useEffect(() => {
    Blogs.doc(params.blogId)
      .get()
      .then((snapshot) => {
        const commentData = snapshot.data() ? snapshot.data().comments : "";
        setCommentList(commentData);
      });
  }, [Blogs]);

  const deleteCommentHandler = (comment) => {
    Blogs.doc(params.blogId).update({
      comments: fb.firestore.FieldValue.arrayRemove(comment),
    });
  };

  const sendClasses = isComment
    ? `${classes.send} + ${classes.active}`
    : classes.send;

  return (
    <div className={classes.comment}>
      <div className={classes.header}>
        <img
          className={classes.imageActor}
          src={userCtx.user.photoURL}
          alt="user"
        ></img>
        <input
          className={classes.input}
          type="text"
          value={comment}
          onKeyUp={(e) => {
            if (e.target.value.length > 0) {
              setIsComment(true);
            } else {
              setIsComment(false);
            }
          }}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Viết bình luận"
        ></input>
      </div>
      <div className={classes.button}>
        {/* <button className={classes.cancel}>Hủy</button> */}
        <button
          className={sendClasses}
          onClick={commentHandler}
          disabled={!isComment}
        >
          {isSended ? "Đang gửi..." : "Bình luận"}
        </button>
      </div>
      {commentList ? (
        commentList.map((comment) => (
          <div className={classes["user-comment"]}>
            <div>
              <img
                className={classes.imageActor}
                src={comment.userImage}
                alt="image actor"
              ></img>
            </div>
            <div className={classes.content}>
              <div className={classes["user-comment--info"]}>
                <div className={classes.email}>{comment.userEmail}</div>
                <div className={classes.time}>{comment.time}</div>
                {userCtx.user.email === userCtx.currentUser ? (
                  <button
                    onClick={() => {
                      const proceed = window.confirm(
                        "Bạn chắc chắn muốn xóa bình luận này?"
                      );
                      if (proceed) {
                        deleteCommentHandler(comment);
                      }
                    }}
                    className={classes.delete}
                  >
                    Xóa
                  </button>
                ) : (
                  " "
                )}
              </div>
              <div className="">{comment.comment}</div>
            </div>
          </div>
        ))
      ) : (
        <p className={classes.annouce}>Chưa có bình luận nào.</p>
      )}
    </div>
  );
}

export default Comment;

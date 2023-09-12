import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import fb from "../firebase";
import userContext from "../store/user-context";
import classes from "./BlogItem.module.css";

function BlogItem() {
  const db = fb.firestore();
  const params = useParams();
  const userCtx = useContext(userContext);
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const Blogs = db.collection("blogs" + userCtx.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Blogs.doc(params.blogId)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        setBlog(data);

        if (data) setIsLoading(false);
        else setIsLoading(true);
      });
    // console.log(blog);
  }, [Blogs]);
  // console.log(blog);
  function startDeleteHandler(id) {
    Blogs.doc(id)
      .delete()
      // .then(() => {
      // alert("Document successfully deleted!");
      // navigate("/blogs");
      // })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    userCtx.currentUser = "";
  }
  // console.log(blog);
  return (
    <article className={classes.event}>
      <i
        className="fi fi-ss-cross icon"
        onClick={() => {
          userCtx.currentUser !== userCtx.user.email
            ? navigate("..")
            : navigate("/blogs/profile");
        }}
      ></i>
      {isLoading ? (
        <p className={classes.annouce}>Loading...</p>
      ) : blog ? (
        <div className={classes.info}>
          <div>
            <img
              className={classes.imageActor}
              src={blog.ImageActor}
              alt="image actor"
            ></img>
          </div>
          <div className={classes.actor}>
            <p className={classes.name}>{blog.Actor}</p>
            <p className={classes.time}>{blog.Time}</p>
          </div>
        </div>
      ) : (
        "Không tồn tại bài viết hoặc đã bị xóa."
      )}
      <p className={classes.title}>{blog ? blog.Title : ""}</p>

      <div
        className={classes.body}
        dangerouslySetInnerHTML={{ __html: blog ? blog.Body : undefined }}
      />
      {userCtx.user.email === userCtx.currentUser ? (
        <menu className={classes.actions}>
          <NavLink className={classes.fix} to="edit">
            Sửa
          </NavLink>
          <button
            onClick={() => {
              const proceed = window.confirm(
                "Bạn chắc chắn muốn xóa bài viết này?"
              );
              if (proceed) {
                startDeleteHandler(params.blogId);
                navigate("/blogs/profile");
              }
            }}
            className={classes.delete}
            disabled={isLoading}
          >
            Xóa
          </button>
        </menu>
      ) : (
        " "
      )}
    </article>
  );
}

export default BlogItem;

import React, { useState, useEffect, useContext } from "react";
import fb from "../firebase";
import classes from "./BlogsList.module.css";
import { NavLink } from "react-router-dom";
import userContext from "../store/user-context";
import BlogNavigation from "./BlogNavigation";
const db = fb.firestore();

function MyList() {
  const userCtx = useContext(userContext);
  const Blogs = db.collection("blogs" + userCtx.user.email);
  const [blogs, setblogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = (blogActor) => {
    userCtx.currentUser = blogActor;
  };
  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setblogs(data);
      if (data) setIsLoading(false);
      else setIsLoading(true);
    });

    // Detach listener
    return unsubscribe;
  }, [Blogs]);
  return (
    <React.Fragment>
      <BlogNavigation />
      <div className={classes.blogs}>
        <p className={classes.title}>Danh sách blog của bạn </p>
        <ul className={classes.list}>
          {blogs.length ? (
            // {setIsLoading(false)}
            blogs.map((blog) => (
              <li key={blog.id} className={classes.item}>
                <NavLink to={blog.id} onClick={setCurrentUser(blog.Actor)}>
                  {/* <img src={blog.image} alt={blog.title} /> */}
                  {/* <p className={classes.name}>{blog.name}</p> */}
                  <div className={classes["img-container"]}>
                    <img
                      className={classes["img-title"]}
                      src={blog.ImageTitle ? blog.ImageTitle : " "}
                      alt="im"
                    ></img>
                  </div>

                  <div key={blog.id} className={classes["my-list--content"]}>
                    <h2>{blog.Title}</h2>
                    <p>{blog.Time}</p>
                  </div>
                </NavLink>
              </li>
            ))
          ) : isLoading ? (
            <p className={classes.annouce}>Loading...</p>
          ) : (
            <p className={classes.annouce}>Bạn chưa có bài đăng nào.</p>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default MyList;

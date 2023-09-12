import React, { useState, useContext, useEffect } from "react";
import fb from "../firebase";
import classes from "./BlogsList.module.css";
import { NavLink } from "react-router-dom";
import userContext from "../store/user-context";

function BlogsList() {
  const db = fb.firestore();
  const userCtx = useContext(userContext);
  const [blogs, setblogs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [countSearched, setCountSearched] = useState(0);
  useEffect(() => {
    const newDataArray = userCtx.listUser.map((user) => {
      if (user !== "blogs" + userCtx.user.email) {
        const Blogs = db.collection(user);

        return new Promise((resolve, reject) => {
          const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            if (data) setIsLoading(false);
            else setIsLoading(true);
            resolve(data);
          }, reject);
          return unsubscribe;
        });
      }
    });

    // Xử lý lặp lại và chờ đợi các kết quả
    Promise.all(newDataArray)
      .then((results) => {
        const newArray = results.flat(); // Mảng mới chứa tất cả các phần tử của mảng data sau khi lặp
        setblogs(newArray);
        // console.log(2);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [search]);

  const searchHandler = (e) => {
    e.preventDefault();
    setblogs(
      blogs.filter(
        (blog) =>
          blog && blog.Title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div className={classes.blogs}>
      <form
        className={classes["form-search"]}
        onSubmit={(e) => searchHandler(e)}
      >
        <input
          type="text"
          placeholder="Tìm kiếm"
          onChange={(e) => setSearch(e.target.value)}
          className={classes["input-search"]}
        />
        <button type="submit" className={classes.search}>
          Tìm kiếm
        </button>
      </form>

      <p className={classes.title}>Danh sách blog </p>
      <ul className={classes.list}>
        {blogs.length > 0 ? (
          blogs.map((blog) =>
            blog ? (
              <li key={blog.id} className={classes.item}>
                <NavLink
                  to={blog.id}
                  onClick={() => (userCtx.currentUser = blog.Actor)}
                >
                  <div className={classes["img-container"]}>
                    <img
                      src={blog.ImageTitle}
                      className={classes["img-title"]}
                    ></img>
                  </div>
                  <div className={classes.details}>
                    <div className={classes.info}>
                      <img
                        className={classes["img-actor"]}
                        src={blog.ImageActor}
                        alt={blog.title}
                      />
                      <div className={classes.content}>
                        <p className={classes.name}>{blog.Actor}</p>
                        <p className={classes.time}>{blog.Time}</p>
                      </div>
                    </div>
                    {/* <div className={classes.content}> */}
                    <p className={classes["blog-title"]}>{blog.Title}</p>
                    {/* </div> */}
                  </div>
                </NavLink>
              </li>
            ) : (
              // ""

              blogs.length == 1 &&
              !blogs[0] && (
                <p className={classes.annouce}>Chưa có bài viết nào mới.</p>
              )
            )
          )
        ) : isLoading ? (
          <p className={classes.annouce}>Loading...</p>
        ) : (
          <p className={classes.annouce}>Không có bài viết phù hợp.</p>
        )}
      </ul>
    </div>
  );
}
export default BlogsList;

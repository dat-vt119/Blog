import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogsForm from "../components/BlogsForm";
import fb from "../firebase";
import userContext from "../store/user-context";

function EditBlogPage() {
  const userCtx = useContext(userContext);
  const db = fb.firestore();
  const Blogs = db.collection("blogs" + userCtx.user.email);
  const params = useParams();
  const [blog, setBlog] = useState([]);

  // useEffect(() => {
  Blogs.doc(params.blogId)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      setBlog(data);
    });
  // }, []);

  return <BlogsForm blogEdit={blog} idEdit={params.blogId} />;
}

export default EditBlogPage;

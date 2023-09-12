import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import fb from "../firebase";
import userContext from "../store/user-context";
import classes from "./BlogsForm.module.css";
import { Editor } from "@tinymce/tinymce-react";
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
const BlogsForm = ({ blogEdit, idEdit }) => {
  const db = fb.firestore();
  const userCtx = useContext(userContext);
  const navigate = useNavigate();
  const Blogs = db.collection("blogs" + userCtx.user.email);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const addBlog = (e) => {
    e.preventDefault();

    Blogs.add({
      Actor: userCtx.user.email,
      ImageActor: String(userCtx.user.photoURL),
      ImageTitle: String(image),
      Title: title,
      Body: body,
      Time: date(),
      publish: false,
    })
      .then((docRef) => {
        // alert("Data Successfully Submitted");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    navigate("/blogs/profile");
  };
  const editBlog = (e) => {
    e.preventDefault();
    // Add data to the store
    Blogs.doc(idEdit)
      .update({
        Title: title ? title : blogEdit.Title,
        Body: body ? body : blogEdit.Body,
        Time: date(),
        ImageTitle: image ? image : blogEdit.ImageTitle,
      })
      // .then((docRef) => {
      //   alert("Data Successfully Updated");
      // })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    navigate("/blogs/profile");
  };
  const showFile = function (e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    // reader.onload = function (e) {
    //   setImage(e.target.value);
    // };
    reader.addEventListener("load", () => {
      reader.result && setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={(event) => {
        blogEdit ? editBlog(event) : addBlog(event);
      }}
      className={classes.form}
    >
      <p className={classes.title}>Tạo bài viết mới</p>
      <p>
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          defaultValue={blogEdit ? blogEdit.Title : ""}
          required
        />
      </p>
      <p>
        <label>Ảnh chủ đề</label>
        <input type="file" accept="image/*" onChange={showFile}></input>
      </p>
      <p>
        <label htmlFor="description">Nội dung</label>
        <Editor
          className={classes.textarea}
          textareaName="description"
          initialValue={blogEdit ? blogEdit.Body : " "}
          onEditorChange={(newText) => setBody(newText)}
          init={{
            height: 600,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount image",
              "image",
              "media",
              "preview",
              "fullscreen",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "fontfamily fontsize blocks" +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help" +
              "bullist numlist outdent indent | link image | print preview media fullsreen" +
              "undo redo | link image | code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            file_picker_types: "file image media",
          }}
        ></Editor>
      </p>
      <div className={classes.actions}>
        <button onClick={() => navigate("/blogs/profile")} type="button">
          Hủy
        </button>
        <button type="submit">Lưu</button>
      </div>
    </form>
  );
};

export default BlogsForm;

import React from "react";
import classes from "./Header.module.css";
import logo from "../img/logo-white.png";
import { useNavigate } from "react-router-dom";
import thietkeimage from "../img/thietke.png";
import kyniemimage from "../img/kyniem.png";
import wolrdimage from "../img/world.png";
import blogtulamimage from "../img/blogtulam.png";
import videoimage from "../img/video.png";
import documentimage from "../img/document.png";

function Header() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes["header__logo-box"]}>
          <img src={logo} alt="logo" className={classes["header__logo"]} />
        </div>
        <div className={classes["header__text-box"]}>
          <h1 className={classes["heading-primary"]}>
            <span className={classes["heading-primary--main"]}>Blog</span>
            <span className={classes["heading-primary--sub"]}>
              Is there life happens
            </span>
          </h1>
          <button
            className={`${classes.btn} ${classes["btn--white"]} ${classes["btn--animated"]}`}
            onClick={() => navigate("/blogs/profile/new")}
          >
            Tạo bài đăng mới
          </button>
        </div>
      </header>

      <main>
        <section className={classes["section-how"]} id="how">
          <div className={classes["container"]}>
            {/* <span className={classes.subheading}>How it works</span> */}
            <h2 className={classes["heading-secondary"]}>
              Dễ dàng tạo blog độc đáo và tuyệt đẹp.
            </h2>
          </div>

          <div
            className={`${classes.container} ${classes.grid} ${classes["grid--2-cols"]} ${classes["grid--center-v"]}`}
          >
            <div className={classes["step-text-box"]}>
              <p className={classes["step-number"]}>01</p>
              <h3 className={classes["heading-tertiary"]}>
                Chọn thiết kế hoàn hảo
              </h3>
              <p className={classes["step-description"]}>
                Tạo blog tuyệt đẹp phù hợp với phong cách của bạn. Chọn trong
                một tuyển tập gồm các mẫu dễ sử dụng – tất cả đều có bố cục linh
                hoạt và hàng trăm hình nền – hoặc thiết kế điều gì đó mới lạ.
              </p>
            </div>
            {/* <div className={classes["step-img-box"]}> */}
            <img
              className={`${classes["step-img"]} ${classes["step-img--up"]} `}
              src={thietkeimage}
              alt="example-image"
            />
            <img
              className={` ${classes["step-img--down"]} `}
              src={blogtulamimage}
              alt="example-image"
            />
            {/* </div> */}
            {/* <div className={classes["step-img-box"]}> */}
            <img
              className={`${classes["step-img"]} ${classes["step-img--memory"]} `}
              src={kyniemimage}
              alt="example-image"
            />
            <img
              className={` ${classes["step-img--video"]} `}
              src={videoimage}
              alt="example-image"
            />
            <img
              className={`${classes["step-img--document"]} `}
              src={documentimage}
              alt="example-image"
            />
            {/* </div> */}
            <div className={classes["step-text-box"]}>
              <p className={classes["step-number"]}>02</p>
              <h3 className={classes["heading-tertiary"]}>
                Lưu giữ kỷ niệm của bạn
              </h3>
              <p className={classes["step-description"]}>
                Lưu các khoảnh khắc quan trọng. Blog cho phép bạn lưu trữ an
                toàn hàng nghìn bài đăng, ảnh và nhiều nội dung khác qua Google
              </p>
            </div>
            <div className={classes["step-text-box"]}>
              <p className={classes["step-number"]}>03</p>
              <h3 className={classes["heading-tertiary"]}>
                Tham gia cùng hàng triệu người dùng khác
              </h3>
              <p className={classes["step-description"]}>
                Dù bạn chia sẻ chuyên môn của mình, tin nổi bật hoặc một ý tưởng
                bạn nghĩ ra, bạn luôn có người đồng hành trên Blog.
              </p>
            </div>
            <img
              className={`${classes["step-img"]} ${classes["step-img--world"]} `}
              src={wolrdimage}
              alt="example-image"
            />
          </div>
        </section>

        <footer>
          <p className={classes.footer}>© Copyright 20204723</p>
        </footer>
      </main>
    </React.Fragment>
  );
}
export default Header;

import classes from "./BlogNavigation.module.css";
import { NavLink } from "react-router-dom";
function BlogNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {/* <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Danh sách Blog
          </NavLink> */}

          <NavLink
            to="new"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Tạo bài viết mới
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default BlogNavigation;

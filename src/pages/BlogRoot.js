import React from "react";
import BlogNavigation from "../components/BlogNavigation";
import { Outlet } from "react-router-dom";
function BlogRoot() {
  return (
    <div>
      {/* <BlogNavigation /> */}
      <Outlet />
    </div>
  );
}

export default BlogRoot;

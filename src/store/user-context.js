import React from "react";

const userContext = React.createContext({
  user: null,
  isLogged: false,
  listUser: [],
  listBlog: [],
  currentUser: "",
  isGetData: false,
});
export default userContext;

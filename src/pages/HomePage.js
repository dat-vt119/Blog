import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import fb from "../firebase";
import userContext from "../store/user-context";
const db = fb.firestore();
const Blogs = db.collection("users");
const HomePage = () => {
  const userCtx = useContext(userContext);

  useEffect(() => {
    if (userCtx.user.email && userCtx.isLogged) {
      Blogs.add({ users: "blogs" + userCtx.user.email });
    }
  }, [userCtx.isLogged === true]);

  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setblogs(data);
    });
    // Detach listener
    return unsubscribe;
  }, []);

  userCtx.listUser = [...new Set(blogs.map((user) => user.users))];

  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
};

export default HomePage;

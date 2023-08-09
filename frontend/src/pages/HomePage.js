import React, { useEffect, useState } from "react";
import ClassListNavigation from "../components/ClassListNavigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
const HomePage = () => {
  const [socket, setSocket] = useState(null);

  return (
    <div>
      <Header />
      <ClassListNavigation />
      <Footer />
    </div>
  );
};

export default HomePage;

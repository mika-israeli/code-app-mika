import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeBlockPage from "./pages/CodeBlockPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/:codeBlockId" element={<CodeBlockPage />} />
        {/* <Route exact path="/code-block-page-2" element={<CodeBlockPage2 />} />
        <Route exact path="/code-block-page-3" element={<CodeBlockPage3 />} />
        <Route exact path="/code-block-page-4" element={<CodeBlockPage4 />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

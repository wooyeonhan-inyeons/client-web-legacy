import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./css/GlobalStyle";
import Main from "./routes/Main";
import Mypage from "./routes/Mypage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <a href="/">main</a>
      <br />
      <a href="/mypage">my page</a>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

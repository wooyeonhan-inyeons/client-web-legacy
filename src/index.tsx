import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import "antd/dist/antd.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import StartUp from "./.start/index";
import { createGlobalStyle } from "styled-components";
const KOTRA_URL =
  "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_SONGEULSSI.woff";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "KOTRA_SONGEULSSI";
  src: url(${KOTRA_URL})
    format("woff");
  font-weight: normal;
  font-style: normal;
}
`;

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <StartUp />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();

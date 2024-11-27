import { ConfigProvider } from "antd";
import pt_BR from "antd/lib/locale/pt_BR";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
  <ConfigProvider locale={pt_BR}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);

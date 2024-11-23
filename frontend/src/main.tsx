import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import SolicitacaoViagem from "./SolicitacaoViagem.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} />
    </Routes>
  </BrowserRouter>
);

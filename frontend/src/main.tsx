import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import OpcoesViagem from "./OpcoesViagem.tsx";
import SolicitacaoViagem from "./SolicitacaoViagem.tsx";

const root = document.getElementById("root");
// TODO - colocar layout padrão do header
ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} />
      <Route path="/opcoes-viagem/:customer_id" element={<OpcoesViagem />} />
    </Routes>
  </BrowserRouter>
);

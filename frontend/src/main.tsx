import { ConfigProvider } from "antd";
import pt_BR from "antd/lib/locale/pt_BR";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Historico from "./pages/Historico.tsx";
import OpcoesViagem from "./pages/OpcoesViagem.tsx";
import SolicitacaoViagem from "./pages/SolicitacaoViagem.tsx";

const root = document.getElementById("root");
// TODO - colocar layout padrão do header
ReactDOM.createRoot(root!).render(
  <ConfigProvider locale={pt_BR}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SolicitacaoViagem />} />
        <Route path="/opcoes-viagem/:customer_id" element={<OpcoesViagem />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);

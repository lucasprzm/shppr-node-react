import { ConfigProvider } from "antd";
import pt_BR from "antd/lib/locale/pt_BR";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Historico from "./Historico.tsx";
import "./index.css";
import OpcoesViagem from "./OpcoesViagem.tsx";
import SolicitacaoViagem from "./SolicitacaoViagem.tsx";

const root = document.getElementById("root");
// TODO - colocar layout padrão do header
ReactDOM.createRoot(root!).render(
  <ConfigProvider locale={pt_BR}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} />
        <Route path="/opcoes-viagem/:customer_id" element={<OpcoesViagem />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);

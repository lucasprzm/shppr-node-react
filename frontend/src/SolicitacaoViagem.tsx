import { Button, Form, FormProps, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { environment } from "./environments/enviroment";
import { CustomExceptionResponse } from "./types/exception.type";
import { RideEstimateReq } from "./types/ride-estimate-req.type";

function SolicitacaoViagem() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const onFinish: FormProps<RideEstimateReq>["onFinish"] = (values) => {
    setCarregando(true);
    // TODO - verificar no formulário de entrega se pedem o id do usuário
    values.customer_id = "a3dbf154-a0ce-4b58-b0d4-343d06ffe514";
    axios
      .post(`${environment.api.url}/ride/estimate`, values)
      .then((response) => {
        console.log(response.data);
        navigate("/opcoes-viagem", { state: { data: response.data } });
      })
      .catch((error) => {
        openErrorNotification(error.response.data);
      })
      .finally(() => setCarregando(false));
  };

  const openErrorNotification = ({ error_code, error_description }: CustomExceptionResponse) => {
    api.error({
      message: error_code,
      description: error_description,
      placement: "top",
      pauseOnHover: true,
    });
  };

  return (
    <div className="mx-auto">
      <nav className="w-full bg-white border-b border-gray-200 fixed top-0 lg:relative z-[1000]">
        <div className="mx-auto max-w-[100rem] pl-3 pr-2 sm:pl-4 lg:px-4 2xl:px-6">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="my-auto">
                <img className="h-7 w-auto" src="/src/assets/3624755.jpg" alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mt-[65px] lg:mt-0">
        <div className="2xl:mx-auto 2xl:max-w-[1516px] min-[1560px]:max-w-screen-2xl flex justify-center">
          {contextHolder}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="my-8 w-full"
          >
            <Form.Item<RideEstimateReq>
              label="Id do Usuário"
              name="customer_id"
              rules={[{ required: true, message: "Digite o Id do usuário" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<RideEstimateReq>
              label="Origem"
              name="origin"
              rules={[{ required: true, message: "Digite o endereço de origem" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<RideEstimateReq>
              label="Destino"
              name="destination"
              rules={[{ required: true, message: "Digite o endereço de destino" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" loading={carregando}>
                Estimar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </div>
  );
}

export default SolicitacaoViagem;

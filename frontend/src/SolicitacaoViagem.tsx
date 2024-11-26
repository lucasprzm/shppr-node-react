import { Button, Form, FormProps, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import appLogo from "./assets/3624755.jpg";
import { environment } from "./environments/enviroment";
import { CustomExceptionResponse } from "./types/exception.type";
import { RideEstimateReq } from "./types/ride-estimate-req.type";

function SolicitacaoViagem() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const onFinish: FormProps<RideEstimateReq>["onFinish"] = (values) => {
    setCarregando(true);
    axios
      .post(`${environment.api.url}/ride/estimate`, values)
      .then((response) => {
        navigate(
          `/opcoes-viagem/${values.customer_id}?origin=${values.origin}&destination=${values.destination}`,
          { state: { data: response.data } }
        );
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
  // TODO - fazer input com pesquisa de endereço
  return (
    <div className="mx-auto">
      <nav className="w-full bg-white border-b border-gray-200 fixed top-0 lg:relative z-[1000]">
        <div className="mx-auto max-w-[100rem] pl-3 pr-2 sm:pl-4 lg:px-4 2xl:px-6">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="my-auto">
                <img className="h-7 w-auto" src={appLogo} alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mt-[65px] lg:mt-0">
        <div className="2xl:mx-auto 2xl:max-w-[1516px] min-[1560px]:max-w-screen-2xl flex justify-center">
          {contextHolder}
          <div className="flex flex-col">
            <section className="mt-8">
              <h1 className="text-3xl font-bold text-center">Solicitação de viagem</h1>
            </section>
            <section className="my-8">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="w-full"
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
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SolicitacaoViagem;

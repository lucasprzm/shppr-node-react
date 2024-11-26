import { Button, Form, FormProps, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { environment } from "../environments/enviroment";
import Header from "../shared/components/Header";
import { CustomExceptionResponse } from "../shared/types/exception.type";
import { RideEstimateReq } from "../shared/types/ride-estimate-req.type";

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

  // TODO - aprimorar tratamento de erro para erros não esperados
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
      <Header />
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

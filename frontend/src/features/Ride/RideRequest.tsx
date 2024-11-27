import { Button, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header/Header";
import { estimateRideApi } from "../../services/api";
import { RideEstimateReq } from "../../types/ride-estimate-req.type";

function RideRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<RideEstimateReq>["onFinish"] = (values) => {
    setLoading(true);
    estimateRideApi(values)
      .then((response) => {
        navigate(
          `/opcoes-viagem/${values.customer_id}?origin=${values.origin}&destination=${values.destination}`,
          { state: { data: response.data } }
        );
      })
      .finally(() => setLoading(false));
  };

  // TODO - fazer input com pesquisa de endereço
  return (
    <div className="mx-auto">
      <Header />
      <main className="mt-[65px] lg:mt-0">
        <div className="2xl:mx-auto 2xl:max-w-[1516px] min-[1560px]:max-w-screen-2xl flex justify-center">
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
                  <Button type="primary" htmlType="submit" loading={loading}>
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

export default RideRequest;

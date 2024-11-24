import { Button, Form, FormProps, Input, notification, Select, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "./environments/enviroment";
import { Driver } from "./types/driver.type";
import { CustomExceptionResponse } from "./types/exception.type";
import { RideByCustomer, RideDriver } from "./types/ride-byCustomer.type";

function Historico() {
  const [carregando, setCarregando] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [historico, setHistorico] = useState<RideByCustomer>();

  useEffect(() => {
    axios
      .get(`${environment.api.url}/driver`)
      .then((response) => {
        setDrivers([...response.data, { id: null, name: "Todos" }]);
      })
      .catch((error) => {
        openErrorNotification(error.response.data);
      });
  }, []);

  type FormType = {
    customer_id: string;
    driver_id?: string;
  };

  const onFinish: FormProps<FormType>["onFinish"] = (values) => {
    let url = `${environment.api.url}/ride/${values.customer_id}`;
    if (!!values.driver_id) {
      url += `?driver_id=${values.driver_id}`;
    }

    setCarregando(true);
    axios
      .get<RideByCustomer>(url)
      .then((response) => {
        console.log(response.data);
        setHistorico(response.data);
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

  const columns: TableProps<RideDriver>["columns"] = [
    {
      title: "Data da viagem",
      dataIndex: "date",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Nome do motorista",
      dataIndex: "name",
      render: (ridedriver: RideDriver) => ridedriver?.driver?.name,
    },
    {
      title: "Origem",
      dataIndex: "origin",
    },
    {
      title: "Destino",
      dataIndex: "destination",
    },
    {
      title: "Distância",
      dataIndex: "distance",
      render: (distance: number) => `${distance} km`,
    },
    {
      title: "Tempo",
      dataIndex: "duration",
    },
    {
      title: "Valor da viagem",
      dataIndex: "value",
      render: (value: number) =>
        `R$ ${Intl.NumberFormat("pt-BR", { currency: "BRL", maximumFractionDigits: 2 }).format(
          value
        )}`,
    },
  ];

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
          <div className="flex flex-col">
            <section className="mt-8">
              <h1 className="text-3xl font-bold text-center">Histórico</h1>
            </section>
            <section className="flex justify-center mt-8">
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
                <Form.Item<FormType>
                  label="Id do Usuário"
                  name="customer_id"
                  rules={[{ required: true, message: "Digite o Id do usuário" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FormType> label="Motorista" name="driver_id">
                  <Select
                    options={drivers
                      ?.map((driver) => {
                        return { label: driver.name, value: driver.id };
                      })
                      .sort((a, b) => a.label.localeCompare(b.label))}
                  />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit" loading={carregando}>
                    Buscar
                  </Button>
                </Form.Item>
              </Form>
            </section>
            <section className="my-8">
              <Table<RideDriver> columns={columns} dataSource={historico?.rides} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Historico;

import { Button, Form, FormProps, Input, notification, Select, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "../environments/enviroment";
import Header from "../shared/components/Header";
import { Driver } from "../shared/types/driver.type";
import { CustomExceptionResponse } from "../shared/types/exception.type";
import { RideByCustomer, RideDriver } from "../shared/types/ride-byCustomer.type";

function Historico() {
  const [carregando, setCarregando] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [historico, setHistorico] = useState<RideByCustomer>();

  useEffect(() => {
    axios
      .get<Driver[]>(`${environment.api.url}/driver`)
      .then((response) => {
        setDrivers([...response.data, { id: 0, name: "Todos" } as Driver]);
      })
      .catch((error) => {
        openErrorNotification(error.response.data);
      });
  }, []);

  type FormType = {
    customer_id: string;
    driver_id?: number;
  };

  const onFinish: FormProps<FormType>["onFinish"] = (values) => {
    let url = `${environment.api.url}/ride/${values.customer_id}`;
    if (values.driver_id !== 0) {
      url += `?driver_id=${values.driver_id}`;
    }

    setCarregando(true);
    axios
      .get<RideByCustomer>(url)
      .then((response) => {
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
      dataIndex: "driver",
      render: (driver: Driver) => driver.name,
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
      render: (distance: number) =>
        `${Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(distance)} km`,
    },
    {
      title: "Tempo",
      dataIndex: "duration",
      // converter formato de string xxxs para hh:mm:ss
      render: (duration: string) => {
        const seconds = parseInt(duration);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        // colocar 0 a esquerda ou a direita
        const sec = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${sec
          .toString()
          .padStart(2, "0")}`;
      },
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
      <Header />
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
                initialValues={{ remember: true, driver_id: 0 }}
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

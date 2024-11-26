import { Button, Form, FormProps, Input, Select, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getDriversApi, getRidesApi } from "../../services/api";
import { Driver, RideByCustomer, RideDriver } from "../../types";

function RideHistory() {
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [history, setHistory] = useState<RideByCustomer>();

  useEffect(() => {
    getDriversApi().then((response) => {
      setDrivers([...response.data, { id: 0, name: "Todos" } as Driver]);
    });
  }, []);

  type FormType = {
    customer_id: string;
    driver_id?: number;
  };

  const onFinish: FormProps<FormType>["onFinish"] = (values) => {
    setLoading(true);
    getRidesApi(values.customer_id, values.driver_id)
      .then((response) => {
        setHistory(response.data);
      })
      .finally(() => setLoading(false));
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
      render: (duration: string) => {
        const seconds = parseInt(duration);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Buscar
                  </Button>
                </Form.Item>
              </Form>
            </section>
            <section className="my-8">
              <Table<RideDriver> columns={columns} dataSource={history?.rides} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RideHistory;

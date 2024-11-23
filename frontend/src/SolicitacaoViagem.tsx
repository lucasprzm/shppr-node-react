import { Button, Form, FormProps, Input } from "antd";

function SolicitacaoViagem() {
  type FieldType = {
    customer_id?: string;
    origin?: string;
    destination?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <div className="2xl:mx-auto 2xl:max-w-[1516px] min-[1560px]:max-w-screen-2xl">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="my-8"
          >
            <Form.Item<FieldType>
              label="Id do Usuário"
              name="customer_id"
              rules={[{ required: true, message: "Digite o Id do usuário" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Origem"
              name="origin"
              rules={[{ required: true, message: "Digite o endereço de origem" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Destino"
              name="destination"
              rules={[{ required: true, message: "Digite o endereço de destino" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
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

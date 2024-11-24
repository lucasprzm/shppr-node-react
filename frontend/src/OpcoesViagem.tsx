import { Button, Image, notification, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { environment } from "./environments/enviroment";
import { CustomExceptionResponse } from "./types/exception.type";
import { RideConfirmReq } from "./types/ride-confirm-req.type";
import { RideCoordinatesReq } from "./types/ride-coordinates-req.type";
import { RideEstimate } from "./types/ride-estimate.type";
import { Ride } from "./types/ride.type";

function OpcoesViagem() {
  const location = useLocation();
  const estimatedRide = location.state.data as RideEstimate;
  const [carregando, setCarregando] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const params = useParams();
  const [map, setMap] = useState<string>("");

  useEffect(() => {
    const request: RideCoordinatesReq = {
      origin: estimatedRide.origin,
      destination: estimatedRide.destination,
    };
    axios
      .post(`${environment.api.url}/ride/estimate/map`, request)
      .then((response) => {
        setMap(response.data);
      })
      .catch((error) => {
        openErrorNotification(error.response.data);
      });
  }, []);

  const columns: TableProps<Ride>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Veículo",
      dataIndex: "vehicle",
    },
    {
      title: "Avaliação",
      dataIndex: "review",
      render: (review: Ride["review"]) => (
        <>
          <p>{review.rating}/5</p>
          <p>{review.comment}</p>
        </>
      ),
    },
    {
      title: "Valor da viagem",
      dataIndex: "value",
    },
    {
      title: "Ação",
      dataIndex: "action",
      // TODO - colocar popconfirm
      render: (_, ride) => (
        <Button type="primary" onClick={() => confirmRide(ride)} loading={carregando}>
          Escolher
        </Button>
      ),
    },
  ];

  const confirmRide = (ride: Ride) => {
    const rideConfirm: RideConfirmReq = {
      customer_id: params.customer_id,
      // TODO - ajustar para pegar o endereço fornecido pelo usuário
      origin: `${estimatedRide.origin.latitude}, ${estimatedRide.origin.longitude}`,
      destination: `${estimatedRide.destination.latitude}, ${estimatedRide.destination.longitude}`,
      distance: estimatedRide.distance,
      duration: estimatedRide.duration,
      driver: { ...ride },
      value: ride.value,
    };

    setCarregando(true);
    axios
      .patch(`${environment.api.url}/ride/confirm`, rideConfirm)
      .then((response) => {
        console.log(response.data);
        navigate("/historico");
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

  // TODO - adicionar botão para voltar
  // TODO - adicionar título
  // TODO - adicionar descrição
  // TODO - adicionar mapa
  // TODO - verificar erro do console de key da tabela
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
            <section className="flex justify-center mt-8">
              <Image width={600} src={map} />
            </section>
            <section>
              <Table<Ride> columns={columns} dataSource={estimatedRide.options} className="my-8" />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OpcoesViagem;

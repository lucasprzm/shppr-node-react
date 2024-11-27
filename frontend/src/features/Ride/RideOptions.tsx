import { Button, Image, Popconfirm, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import Header from "../../components/Header/Header";
import { confirmRideApi, getMapApi } from "../../services/api";
import { Ride, RideConfirmReq, RideCoordinatesReq, RideEstimate } from "../../types";

function RideOptions() {
  const location = useLocation();
  const estimatedRide = location.state.data as RideEstimate;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [map, setMap] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const request: RideCoordinatesReq = {
      origin: estimatedRide.origin,
      destination: estimatedRide.destination,
    };
    getMapApi(request).then((response) => {
      setMap(response.data);
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
      render: (value: number) =>
        `R$ ${Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value)}`,
    },
    {
      title: "Ação",
      dataIndex: "action",
      render: (_, ride) => (
        <Popconfirm
          placement="top"
          title="Deseja escolher essa viagem?"
          okText="Sim"
          cancelText="Não"
          onConfirm={() => confirmRide(ride)}
        >
          <Button type="primary" loading={loading}>
            Escolher
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const confirmRide = (ride: Ride) => {
    const rideConfirm: RideConfirmReq = {
      customer_id: params.customer_id,
      origin: searchParams[0].get("origin") as string,
      destination: searchParams[0].get("destination") as string,
      distance: estimatedRide.distance,
      duration: estimatedRide.duration,
      driver: { id: ride.id, name: ride.name },
      value: ride.value,
    };

    setLoading(true);
    confirmRideApi(rideConfirm)
      .then((response) => {
        if (response.status === 200) navigate("/historico");
      })
      .finally(() => setLoading(false));
  };

  // TODO - adicionar botão para voltar
  // TODO - adicionar descrição
  // TODO - verificar erro do console de key da tabela
  return (
    <div className="mx-auto">
      <Header />
      <main className="mt-[65px] lg:mt-0">
        <div className="2xl:mx-auto 2xl:max-w-[1516px] min-[1560px]:max-w-screen-2xl flex justify-center">
          <div className="flex flex-col">
            <section className="mt-8">
              <h1 className="text-3xl font-bold text-center">Opções de viagem</h1>
            </section>
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

export default RideOptions;
